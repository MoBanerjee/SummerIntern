import {verifyToken} from './middleware/jwtMiddleware.js'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'mohor',
  host: 'localhost',
  database: 'esg',
  password: 'zyx',
  port: 5432,
})
const port = 3000
app.use(cors()); 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })


  const updateFormsRe = (request, response) => {
    try {
      const { fid, mh, gri1, gri2, gri3, gri5, gri6 } = request.body;
      let completeness=false;
      const doer= request.body.doer;
      
      const updateQueries = [
        {
          text: `
            UPDATE forms 
            SET manhours = $1
            WHERE fid = $2;
          `,
          values: [mh, fid],
        },
        {
          text: `
            UPDATE gri301materials2016
            SET rawsteel = $1, steelpipes = $2, othersteel = $3, steelshots = $4, steelgrit = $5, coppergrit = $6,
                weldingconsumables = $7, paint = $8, thinner = $9, complete = $11
            WHERE fid = $10;
          `,
          values: [
            gri1.rawsteel, gri1.steelpipes, gri1.othersteel, gri1.steelshots, gri1.steelgrit, gri1.coppergrit,
            gri1.weldingconsumables, gri1.paint, gri1.thinner, fid,completeness
          ],
        },
        {
          text: `
            UPDATE gri302energy2016
            SET diesel = $1, biodiesel = $2, gasoline = $3, biomethaneliq = $4, biomethanecomp = $5, lpg = $6,
                lng = $7, cng = $8, flamal26 = $9, acetylene = $10, gridelec = $11, solarrenewableenergy = $12,
                recsrenewableenergy = $13, complete = $15
            WHERE fid = $14;
          `,
          values: [
            gri2.diesel, gri2.biodiesel, gri2.gasoline, gri2.biomethaneliq, gri2.biomethanecomp, gri2.lpg, gri2.lng,
            gri2.cng, gri2.flamal26, gri2.acetylene, gri2.gridelec, gri2.solarrenewableenergy, gri2.recsrenewableenergy, fid,completeness
          ],
        },
        {
          text: `
            UPDATE gri303watereffluents2018
            SET surfacewater = $1, groundwater = $2, thirdpartywaterpotable = $3, thirdpartywaternewaterordesal = $4,
            complete = $6
            WHERE fid = $5;
          `,
          values: [
            gri3.surfacewater, gri3.groundwater, gri3.thirdpartywaterpotable, gri3.thirdpartywaternewaterordesal, fid,completeness
          ],
        },
        {
          text: `
            UPDATE gri305emissions2016
            SET co2 = $1, r22 = $2, r32 = $3, r34a = $4, r410a = $5, r404a = $6, r407c = $7, r134a = $8, r141b = $9,
                r600 = $10, complete = $12
            WHERE fid = $11;
          `,
          values: [
            gri5.co2, gri5.r22, gri5.r32, gri5.r34a, gri5.r410a, gri5.r404a, gri5.r407c, gri5.r134a, gri5.r141b, gri5.r600, fid,completeness
          ],
        },
        {
          text: `
            UPDATE gri306waste2020
            SET hazwastefrdisposal = $1, nonhazwastefrincineration = $2, nonhazwastefrlandfill = $3,
                nonhazwastefroffsiterecycling = $4, complete = $6
            WHERE fid = $5;
          `,
          values: [
            gri6.hazwastefrdisposal, gri6.nonhazwastefrincineration, gri6.nonhazwastefrlandfill, gri6.nonhazwastefroffsiterecycling, fid,completeness
          ],
        }
      ];
  
      const executeUpdate = async () => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          for (const query of updateQueries) {
            await client.query(query.text, query.values);
          }
          await client.query('COMMIT');
          response.status(200).send('Updates completed successfully');
        } catch (error) {
          await client.query('ROLLBACK');
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
        } finally {
          client.release();
        }
      };
  
      executeUpdate();
      const query2 = logquery;
      let currentDate = new Date();
      const params2 = [currentDate, 'A new draft of the form with form id '+fid+" was saved", doer];
      
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }


    }
    
    );

    } catch (err) {
      console.error('Unexpected error:', err);
      return response.status(500).send('Internal Server Error');
    }
  };
  const getMonthwiseStatus = (request, response) => {
    const year = request.body.year; 
    const bu = request.body.bu; 
    console.log(bu);
    const query = `
        SELECT ym,
               status
        FROM forms
        WHERE ym LIKE '${year}%' and buid LIKE'${bu}'
        GROUP BY ym,status
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        
        let completeness = new Array(12).fill('Yet to Start');

        
        results.rows.forEach(row => {
            let monthIndex = parseInt(row.ym.slice(-2)) - 1; 
            completeness[monthIndex] = row.status;
            
        });

        response.status(200).json(completeness);
    });
};

const getMonthwiseSubData = (request, response) => {
  const year = request.body.year; 
  const bu = request.body.bu; 
  const t=request.body.type; 

  const query = `
      SELECT ym
      FROM forms
      WHERE ym LIKE '${year}%' and buid LIKE'${bu}' and (status='${t}');
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }


      response.status(200).json(results.rows);
  });
};

const getMonthwiseResubData = (request, response) => {
  const year = request.body.year; 
  const bu = request.body.bu; 


  const query = `
      SELECT ym,status
      FROM forms
      WHERE ym LIKE '${year}%' and buid LIKE'${bu}' and ( status='dl1' or status='dl2' or status='rectify');
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }


      response.status(200).json(results.rows);
  });
};

const getMonthwiseADData = (request, response) => {
  const year = request.body.year; 
  const bu = request.body.bu; 

  let query = `
      SELECT ym,status
      FROM forms
      WHERE ym LIKE '${year}%' and buid LIKE'${bu}' and (status!='saved');
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }


      response.status(200).json(results.rows);
  });
};
const getFormData = (request, response) => {
  const ymonth = request.body.ymonth; 
  const bu = request.body.bu; 
  const doer=request.body.doer;
  const categ=request.body.category
  const query = `
      SELECT fid,manhours,status
             
      FROM forms
      WHERE ym LIKE '${ymonth}%' and buid LIKE'${bu}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      const query2 = logquery;
      let currentDate = new Date();
      const year=ymonth.slice(0,4);
      const month=ymonth.slice(4,6)
      const params2 = [currentDate, 'Form for '+bu+' dated '+month+"/"+year+" was opened for "+categ, doer];
      
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }


    }
    
    );
      response.status(200).json(results);
  });
};

const createNewForm = (request, response) => {
  const ymonth = request.body.ymonth; 
  const bu = request.body.bu; 
  const doer=request.body.doer;
  const query = `
insert into forms ("buid","ym") values('${bu}','${ymonth}');
SELECT fid,manhours
             
FROM forms
WHERE ym LIKE '${ymonth}%' and buid LIKE'${bu}';
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      const query2 = logquery;
      let currentDate = new Date();
      const year=ymonth.slice(0,4);
      const month=ymonth.slice(4,6)
      const params2 = [currentDate, 'Form was created for '+bu+' dated '+month+"/"+year, doer];
      
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }


    }
    
    );
      response.status(200).json(results);
  }
  
  );
};



const updateForms = (request, response) => {
  try {
    const { fid, mh, gri1, gri2, gri3, gri5, gri6 ,type,bu} = request.body;
    let state=""
    const doer=request.body.doer;
    let completeness=true;
    let lev=0;
   let holder=type;


    if(type=="saved"){
      completeness=false;
      holder="saved"
      state="saved"
    }
    else if(type=="submitted"){
      holder="submitted"
      lev=0.5;
      state="submitted"
    }

    else if(type=="submittedre"){
      holder="submitted"
      lev=1;
      state="resubmitted"

    }


    const updateQueries = [
      {
        text: `
          UPDATE forms 
          SET manhours = $1, 
              status = $3 , 
              redo = redo + $4
          WHERE fid = $2;
        `,
        values: [mh, fid, holder, lev],
      },
      {
        text: `
          UPDATE gri301materials2016
          SET rawsteel = $1, steelpipes = $2, othersteel = $3, steelshots = $4, steelgrit = $5, coppergrit = $6,
              weldingconsumables = $7, paint = $8, thinner = $9, complete = $11
          WHERE fid = $10;
        `,
        values: [
          gri1.rawsteel, gri1.steelpipes, gri1.othersteel, gri1.steelshots, gri1.steelgrit, gri1.coppergrit,
          gri1.weldingconsumables, gri1.paint, gri1.thinner, fid,completeness
        ],
      },
      {
        text: `
          UPDATE gri302energy2016
          SET diesel = $1, biodiesel = $2, gasoline = $3, biomethaneliq = $4, biomethanecomp = $5, lpg = $6,
              lng = $7, cng = $8, flamal26 = $9, acetylene = $10, gridelec = $11, solarrenewableenergy = $12,
              recsrenewableenergy = $13, complete = $15
          WHERE fid = $14;
        `,
        values: [
          gri2.diesel, gri2.biodiesel, gri2.gasoline, gri2.biomethaneliq, gri2.biomethanecomp, gri2.lpg, gri2.lng,
          gri2.cng, gri2.flamal26, gri2.acetylene, gri2.gridelec, gri2.solarrenewableenergy, gri2.recsrenewableenergy, fid,completeness
        ],
      },
      {
        text: `
          UPDATE gri303watereffluents2018
          SET surfacewater = $1, groundwater = $2, thirdpartywaterpotable = $3, thirdpartywaternewaterordesal = $4,
          complete = $6
          WHERE fid = $5;
        `,
        values: [
          gri3.surfacewater, gri3.groundwater, gri3.thirdpartywaterpotable, gri3.thirdpartywaternewaterordesal, fid,completeness
        ],
      },
      {
        text: `
          UPDATE gri305emissions2016
          SET co2 = $1, r22 = $2, r32 = $3, r34a = $4, r410a = $5, r404a = $6, r407c = $7, r134a = $8, r141b = $9,
              r600 = $10, complete = $12
          WHERE fid = $11;
        `,
        values: [
          gri5.co2, gri5.r22, gri5.r32, gri5.r34a, gri5.r410a, gri5.r404a, gri5.r407c, gri5.r134a, gri5.r141b, gri5.r600, fid,completeness
        ],
      },
      {
        text: `
          UPDATE gri306waste2020
          SET hazwastefrdisposal = $1, nonhazwastefrincineration = $2, nonhazwastefrlandfill = $3,
              nonhazwastefroffsiterecycling = $4, complete = $6
          WHERE fid = $5;
        `,
        values: [
          gri6.hazwastefrdisposal, gri6.nonhazwastefrincineration, gri6.nonhazwastefrlandfill, gri6.nonhazwastefroffsiterecycling, fid,completeness
        ],
      }
    ];

    const executeUpdate = async () => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        for (const query of updateQueries) {
          await client.query(query.text, query.values);
        }
        await client.query('COMMIT');
        response.status(200).send('Updates completed successfully');
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Database error:', error);
        response.status(500).send('Internal Server Error');
      } finally {
        client.release();
      }
    };

    executeUpdate();
    const query2 = logquery;
    let currentDate = new Date();
    const params2 = [currentDate, 'Form with fid '+fid+" was "+state , doer];
    
    pool.query(query2, params2, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
  }
  );
  if(type=="submitted" || type=="submittedre"){
  updateGJTable(fid,gri2.diesel,gri2.lpg,gri2.cng,gri2.flamal26, gri2.acetylene,gri2.gridelec);
  updateCO2eTable(fid,gri2.diesel,gri2.lpg,gri2.cng,gri2.flamal26, gri2.acetylene,gri2.gridelec);}
  } catch (err) {
    console.error('Unexpected error:', err);
    return response.status(500).send('Internal Server Error');
  }
};

const updateGJTable=(fid,diesel,lpg,cng,flamal26,acetylene,electricity)=>{
  const dieselval=diesel!=-1?diesel*0.84*43/1000: null;
  const lpgval=lpg!=-1?lpg*47.3/1000:null;
  const cngval=cng!=-1?cng*0.7*48/1000:null;
  const flamalval=flamal26!=-1?(flamal26*((0.54/0.27)*(47.3/10000)))+(flamal26*((0.63)*(48/1000))):null;
  const acetval=acetylene!=-1?acetylene*1.165*49.074/1000:null;
  const elecval=electricity!=-1?electricity*3.6:null;
  const params = [fid,dieselval,lpgval,cngval,flamalval,acetval,elecval];
  const query = `
      
insert into gj values($1,$2,$3,$4,$5,$6,$7)
      
  `;
  pool.query(query,params, (error, results) => {
    if (error) {
        console.error('Database error:', error);
        response.status(500).send('Internal Server Error');
        return;
    }


}

);


}

const updateCO2eTable=(fid,diesel,lpg,cng,flamal26,acetylene,electricity,bu)=>{
  const dieselval=diesel!=-1?diesel*(2.676492+(0.0003612*28)+(0.000021672*265)):null;
  const lpgval=lpg!=-1?lpg*(1/0.54)*(1.6117002+(0.00012771*28)+(0.0000025542*265)):null;
  const cngval=cng!=-1?cng*(1.88496+(0.000168*28)+(0.00000336*265)):null;
  const flamalval=flamal26!=-1?flamal26*0.1*(1/0.27)*(1.6117002+(0.00012771*28)+(0.0000025542*265))+flamal26*(1.88496+(0.000168*28)+(0.00000336*265))*0.9:null;
  const acetval=acetylene!=-1?acetylene*1.165*3.3804:null;//purity how
  let EF=0;
  if (bu=='B10' || bu=='B11' || bu=='B12' || bu=='B1'|| bu=='B2' || bu=='B13')EF=0.4168;
  else if (bu=='B14' || bu=='B15' ) EF=0.76;
  else if(bu=='B5' || bu=='B6' )EF=0.5572
  else if(bu=='B7' || bu=='B8' || bu=='B16')EF=0.0385
  else if(bu=='B9')EF=0.37335
  else if(bu='B4' || bu=='B3')EF=0.7122
const elecval=electricity!=-1?electricity*EF:null;
  const query = `
      
insert into co2e values($1,$2,$3,$4,$5,$6,$7)
      
  `;
  const params = [fid,dieselval,lpgval,cngval,flamalval,acetval,elecval];
  pool.query(query,params, (error, results) => {
    if (error) {
        console.error('Database error:', error);
        response.status(500).send('Internal Server Error');
        return;
    }


}

);


}
const approveForm = (request, response) => {
  
  const fid = request.body.fid; 
  const type=request.body.type;
const doer=request.body.doer;
  const query = `
      
  UPDATE forms
  set status='${type}'
  WHERE fid='${fid}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      const query2 = logquery;
      let currentDate = new Date();
      const params2 = [currentDate, 'Form with form id '+fid+" was approved", doer];
      
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }


    }
    
    );
      response.status(200).json(results);
  });
};
const denyForm = (request, response) => {
  
  const fid = request.body.fid; 
  const type=request.body.type;
  const doer=request.body.doer;
  const query = `
      
  UPDATE forms
  set status='${type}'
  WHERE fid='${fid}';

      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      const query2 = logquery;
      let currentDate = new Date();
      const params2 = [currentDate, 'Form with form id '+fid+" was denied", doer];
      
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }


    }
    
    );
      response.status(200).json(results);
  });
};

const fetchDeniedForms = (request, response) => {
  


  const query = `
      
select buid,ym,status
from forms
where (status='dl1' or status='dl2')
order by status desc
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};
const fetchMissedForms = (request, response) => {
  


  const query = `
      
select buid,ym
from forms
where (status!='saved')
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};
const submitRemark = (request, response) => {
  
  const fid = request.body.fid; 
  const remarks=request.body.remarks;
  const doer=request.body.doer;
  const query = `

  insert into remarks (fid,remark) values('${fid}','${remarks}')
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      const query2 = logquery;
      let currentDate = new Date();
      const params2 = [currentDate, 'A remark was submitted for form with form id '+fid, doer];
      
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }


    }
    
    );
      response.status(200).json(results);
  });
};

const resolveRemark = (request, response) => {
  
  const fid = request.body.fid; 
  const doer=request.body.doer;
  const query = `

  update remarks set resolvedstate=true where fid='${fid}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      const query2 = logquery;
      let currentDate = new Date();
      const params2 = [currentDate, 'The pending remark for form with '+fid+" was resolved", doer];
      
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }


    }
    
    );
      response.status(200).json(results);
  });
};
const gri1 = (request, response) => {
  
  const fid = request.body.fid; 
  
  const query = `
      SELECT *
             
      FROM gri301materials2016
      WHERE fid='${fid}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};
const gri2 = (request, response) => {
  
  const fid = request.body.fid; 
  
  const query = `
      SELECT *
             
      FROM gri302energy2016
      WHERE fid='${fid}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};
const gri3 = (request, response) => {
  
  const fid = request.body.fid; 
  
  const query = `
      SELECT *
             
      FROM gri303watereffluents2018
      WHERE fid='${fid}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};
const gri5 = (request, response) => {
  
  const fid = request.body.fid; 
  
  const query = `
      SELECT *
             
      FROM gri305emissions2016
      WHERE fid='${fid}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};
const gri6 = (request, response) => {
  
  const fid = request.body.fid; 
  
  const query = `
      SELECT *
             
      FROM gri306waste2020
      WHERE fid='${fid}'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};

const getRemarks= (request, response) => {
  
  const fid = request.body.fid; 
  
  const query = `
      SELECT remark
             
      FROM remarks
      WHERE fid='${fid}' and resolvedstate=false;
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};

  const logquery = `
  INSERT INTO logbook
  VALUES ($1, $2, $3);`
  const message = `
  INSERT INTO notifications(message,buid,receiver,details,read,time)
  VALUES ($1, $2, $3,$4,$5,$6);`

const createAccount = (request, response) => {
  try {
    const email = request.body.email;
    const pwd = request.body.password; 
    const bus = request.body.bus; 
    const roles = request.body.roles; 
    let currentDate = new Date();
    let role = '';
    if (roles.length > 1) role = 'Both';
    else role = roles[0];

    const highpriv = roles.length > 1 ? true : false;

    const query1 = `
        INSERT INTO accounts(email, password, role, bus, highprivelege)
        VALUES ($1, $2, $3, $4, $5);
    `;
    const params1 = [email, pwd, role, bus, highpriv];  

    const query2 = logquery;
    const params2 = [currentDate, 'New account created for ' + email, 'Admin'];

    pool.query(query1, params1, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        pool.query(query2, params2, (error, results) => {
            if (error) {
                console.error('Database error:', error);
                response.status(500).send('Internal Server Error');
                return;
            }

            response.status(200).send('Account created successfully');
        });
    });
  } catch (error) {
    console.error('Server error:', error);
    response.status(500).send('Internal Server Error');
  }
};


const verifyAccount = (request, response) => {
  try {
    const email = request.body.email;
    const pwd = request.body.password; 
    const query = `
          select email,role,bus,highprivelege from accounts where email='${email}' and password='${pwd}';
    `;
    let currentDate = new Date();

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }
        const token = jwt.sign({ userId: email }, process.env.SECRET_KEY, {
          expiresIn: '1h',
          });
        if(results.rows.length>0){
          const query2 = logquery;
          const params2 = [currentDate, 'Successful Login', email];
          pool.query(query2, params2, (error, results) => {
            if (error) {
                console.error('Database error:', error);
                response.status(500).send('Internal Server Error');
                return;
            }
            
            
        }
        );
        response.status(200).send({rows: results.rows,
          token: token});
        }
      else {
        const query2 = logquery;
        const params2 = [currentDate, 'Failed Login Attempt', email];
        pool.query(query2, params2, (error, results) => {
          if (error) {
              console.error('Database error:', error);
              response.status(500).send('Internal Server Error');
              return;
          }
          
          
      });
        response.status(401).send('Incorrect Credentials');
    
    }
    });
  } catch (error) {
    console.error('Server error:', error);
    response.status(500).send('Internal Server Error');
  }
};

const checkEmail = (request, response) => {
  try {
    const email = request.body.email;
  
    const query = `
          select email from accounts where email='${email}' ;
    `;
    

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }
        if(results.rows.length>0)
        response.status(200).send(results.rows);
      else {
        const query2 = logquery;
        let currentDate = new Date();
        const params2 = [currentDate, 'Unsuccessful profile deletion attempt for email id '+ email, "Admin"];
        
        pool.query(query2, params2, (error, results) => {
          if (error) {
              console.error('Database error:', error);
              response.status(500).send('Internal Server Error');
              return;
          }
  
          response.status(404).send('Incorrect Email Id');
      }
      
      );
       }
    });
  } catch (error) {
    console.error('Server error:', error);
    response.status(500).send('Internal Server Error');
  }
};
const deleteProfile = (request, response) => {
  try {
    const email = request.body.email;
  
    const query = `
          delete from accounts where email='${email}' ;
    `;
    

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }
        const query2 = logquery;
        let currentDate = new Date();
        const params2 = [currentDate, 'Profile deleted for '+email, 'Admin'];
        
        pool.query(query2, params2, (error, results) => {
          if (error) {
              console.error('Database error:', error);
              response.status(500).send('Internal Server Error');
              return;
          }

          response.status(200).send("success");
      }
      
      );
        
      
    });
  } catch (error) {
    console.error('Server error:', error);
    response.status(500).send('Internal Server Error');
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userQuery = await pool.query('SELECT email FROM accounts WHERE email = $1', [email]);
    if (userQuery.rows.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 3600000);

    await pool.query('UPDATE accounts SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3', [
      resetToken,
      resetTokenExpiration,
      email,
    ]);

    const resetUrl = `http://localhost:3000/resetPassword?token=${resetToken}`;
    await sendEmail(email, 'Password Reset', `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`);

    res.send({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).send('Internal Server Error');
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const userQuery = await pool.query('SELECT email FROM accounts WHERE reset_token = $1 AND reset_token_expiration > $2', [
      token,
      new Date(),
    ]);
    if (userQuery.rows.length === 0) {
      return res.status(400).send({ message: 'Invalid or expired token' });
    }

    const email = userQuery.rows[0].email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query('UPDATE accounts SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE email = $2', [
      hashedPassword,
      email,
    ]);

    res.send({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Internal Server Error');
  }
};
const fetchLogs= (request, response) => {
  
  const query = `
      SELECT *
             
      FROM logbook
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
console.log(response)
      response.status(200).json(results);
  });
};
const getFormStatus = (request, response) => {
  const year = request.body.year; 
  

  const query = `
      SELECT ym,buid,status
      FROM forms
      WHERE ym LIKE '${year}%'
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      let status = Array(16)
  .fill()
  .map(() => Array(12).fill("Not Started"));

        
      results.rows.forEach(row => {
            let monthIndex = parseInt(row.ym.slice(-2)) - 1; 
            let bunum= parseInt(row.buid.slice(-1)) - 1; 
            let st=""
            if(row.status=="al1")st="Approved by Level 1";
            else if(row.status=="al2")st="Received by Level 2";
            else if(row.status=="saved")st="Ongoing";
            else if(row.status=="submitted")st="Submitted but yet to be approved by Level 1"
            else if(row.status=="dl1" || row.status=="dl2")st="Denied";
           
           status[bunum][monthIndex] = st;
            
        });

      response.status(200).json(status);
  });
};
const makeLogEntry = (request, response) => {
  
        const query2 = logquery;
     let currentDate = new Date();

       const params2 = [currentDate, 'Summary report was downloaded', 'Admin'];
      
     pool.query(query2, params2, (error, results) => {
      if (error) {
        console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
    }


   } 
     );
};
const getFormStats = (request, response) => {
  const year = request.body.year;
  const bu=request.body.bu;

  const query = `
      SELECT status,count(*) as counter
      FROM forms
      WHERE ym LIKE '${year}%' and buid LIKE '${bu}'
      group by status
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      let stats = Array(12).fill(0);


        
      results.rows.forEach(row => {


          
            if(row.status=="al1")stats[4]=row.counter
            else if(row.status=="al2")stats[5]=row.counter
            else if(row.status=="saved")stats[2]=row.counter
            else if(row.status=="submitted")stats[3]=row.counter
            else if(row.status=="dl1" || row.status=="dl2")stats[6]=stats[6]+row.counter
            
           
            
        });
      let currentYear=new Date().getFullYear();
      console.log(currentYear)
      if(year==currentYear){
        let currentMonth=new Date().getMonth();
        stats[0]=12-currentMonth;
        console.log(stats[0])
      }
      stats[1]=12-stats[0]-stats[2]-stats[3]-stats[4]-stats[5]-stats[6]
      response.status(200).json(stats);
  });
};
const raiseTicket = async (request, response) => {
  try {
    const reason = request.body.reason;
    const bu = request.body.bus[0];
    const year = request.body.year;
    let month = request.body.month;
    const doer = request.body.doer;

    if (month < 10) {

      month = '0' + String(month);
    } else {
      month = String(month);
    }
    const ym = String(year) + month;

    const query = `
          SELECT *
          FROM forms 
          WHERE ym = $1 AND buid = $2 AND status != 'saved'
    `;

    const queryParams = [ym, String(bu)];

    const results = await pool.query(query, queryParams);

    if (results.rows.length > 0) {
      const query2 = `
        INSERT INTO requests (bu, ym, reason) VALUES ($1, $2, $3)
      `;
      const query2Params = [String(bu), ym, reason];
      
      await pool.query(query2, query2Params);

      const query3 = logquery;
      let currentDate = new Date();
      const query3Params = [currentDate, `Ticket raised for resubmission of form dated ${month}/${year} and belonging to BU ${bu}`, doer];

      await pool.query(query3, query3Params);

      response.status(200).send('Ticket raised successfully');
    } else {
      response.status(404).send('No forms found matching the criteria');
    }
  } catch (error) {
    console.error('Server error:', error);
    response.status(500).send('Internal Server Error');
  }
};
const reviewReq= (request, response) => {
  
  const query = `
      SELECT *
             
      FROM requests
      where status=false
      
  `;

  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }

      response.status(200).json(results);
  });
};
const acceptReq= (request, response) => {
  rq=request.body.rqid
  ym=request.body.ym
  bu=request.body.bu
  const query = `
update requests set acceptance =true, status=true where rqid='${rq}';
      
  `;
  const queryside = `
  update forms set status='rectify' where ym='${ym}' and buid='${bu}';
        
    `;
  const query2 = logquery;
  let currentDate = new Date();

    const params2 = [currentDate, 'Request with Request ID '+rq+" was accepted", 'Admin'];
  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      pool.query(queryside, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.status(200).send("accepted")
    });
  })
  });
};
const denyReq= (request, response) => {
  rq=request.body.rqid
  const query = `
update requests set acceptance =false, status=true where rqid=${rq};
      
  `;
  const query2 = logquery;
  let currentDate = new Date();

    const params2 = [currentDate, 'Request with Request ID '+rq+" was denied", 'Admin'];
  pool.query(query, (error, results) => {
      if (error) {
          console.error('Database error:', error);
          response.status(500).send('Internal Server Error');
          return;
      }
      pool.query(query2, params2, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.status(200).send("denied")
    });
    
  });
};

app.post('/getMonthwiseData',  verifyToken, cors(),getMonthwiseStatus);
app.post('/createAccount', verifyToken, cors(),createAccount);
app.post('/verifyAccount', verifyToken, cors(),verifyAccount);
app.post('/getFormData', verifyToken, cors(),getFormData);
app.post('/getgri1', verifyToken,  cors(),gri1);
app.post('/getgri2', verifyToken, cors(),gri2);
app.post('/getgri3', verifyToken,  cors(),gri3);
app.post('/getgri5',  verifyToken,cors(),gri5);
app.post('/getgri6', verifyToken, cors(),gri6);
app.post('/createnewform',verifyToken,  cors(),createNewForm); 
app.post('/submitForm', verifyToken, cors(),updateForms);
app.post('/submitFormRe',verifyToken,  cors(),updateFormsRe);
app.post('/approveForm', verifyToken, cors(),approveForm);
app.post('/denyForm', verifyToken, cors(),denyForm);
app.post('/submitRemark', verifyToken, cors(),submitRemark);
app.post('/resolveRemark',  verifyToken,cors(),resolveRemark);
app.post('/getMonthwiseADData', verifyToken, cors(),getMonthwiseADData);
app.post('/getMonthwiseSubData', verifyToken, cors(),getMonthwiseSubData);
app.post('/getMonthwiseResubData',verifyToken,  cors(),getMonthwiseResubData);
app.post('/getRemarks', verifyToken, cors(),getRemarks);
app.post('/checkEmail',verifyToken,cors(),checkEmail);
app.post('/deleteProfile',verifyToken,cors(),deleteProfile);
app.post('/forgotPassword',verifyToken, cors(), forgotPassword);
app.post('/resetPassword',verifyToken, cors(), resetPassword);
app.post('/fetchDeniedForms',verifyToken,cors(),fetchDeniedForms);
app.post('/fetchMissedForms',verifyToken,cors(),fetchMissedForms);
app.post('/getLogs',verifyToken,cors(),fetchLogs);
app.post('/getFormStatus',verifyToken,cors(),getFormStatus);
app.post('/getFormStats',verifyToken,cors(),getFormStats);
app.post('/makeLogEntry',verifyToken,cors(),makeLogEntry);
app.post('/raiseTicket',verifyToken,cors(),raiseTicket);
app.post('/reviewReq',verifyToken,cors(),reviewReq);
app.post('/acceptReq',verifyToken,cors(),acceptReq);
app.post('/denyReq',verifyToken,cors(),denyReq);