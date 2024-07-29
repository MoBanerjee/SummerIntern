import ENDPOINTS from './EndPoints';
import APIMethods from './APIMethods'

class APIManager{
static getMonthwiseData=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_MONTHWISE_FORM_DATA,params)
        
    }
static createAccount=async(params)=>{
    return APIMethods.post(ENDPOINTS.CREATE_ACCOUNT,params)
            
    }
   
static verifyAccount=async(params)=>{
    return APIMethods.post(ENDPOINTS.VERIFY_ACCOUNT,params)
                
    }
static getFormData=async(params)=>{
    return APIMethods.post(ENDPOINTS. GET_FORM_DATA,params)
                    
    }
   

static getgri1=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_GRI1,params)
        
    }
static getgri2=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_GRI2,params)
            
    }
   
static getgri3=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_GRI3,params)
                
    }
static getgri5=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_GRI5,params)
                    
    }
static getgri6=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_GRI6,params)
                        
    }
static createnewform=async(params)=>{
    return APIMethods.post(ENDPOINTS.CREATE_NEW_FORM,params)
                            
    }
static submitForm=async(params)=>{
    return APIMethods.post(ENDPOINTS.SUBMIT_FORM,params)
                                
    }
static submitFormRe=async(params)=>{
    return APIMethods.post(ENDPOINTS.RESUBMIT_FORM,params)            
    }
static approveForm=async(params)=>{
    return APIMethods.post(ENDPOINTS.APPROVE_FORM,params)
    }
static denyForm=async(params)=>{
    return APIMethods.post(ENDPOINTS.DENY_FORM,params)
    }

static submitRemark=async(params)=>{
    return APIMethods.post(ENDPOINTS.SUBMIT_REMARK,params)
        
    }
static resolveRemark=async(params)=>{
    return APIMethods.post(ENDPOINTS.RESOLVE_REMARK,params)
            
    }
   
static getMonthwiseADData=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_MONTHWISE_APPROVED_DENIED_DATA,params)
                
    }
static getMonthwiseSubData=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_MONTHWISE_SUBMITTED_DATA,params)
                    
    }
static getMonthwiseResubData=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_MONTHWISE_RESUBMISSION_DATA,params)
                        
    }
static getRemarks=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_REMARKS,params)
                            
    }
static checkEmail=async(params)=>{
    return APIMethods.post(ENDPOINTS.CHECK_EMAIL,params)
                                
    }
                       
static deleteProfile=async(params)=>{
    return APIMethods.post(ENDPOINTS.DELETE_PROFILE,params)
                                    
    }
static forgotPassword=async(params)=>{
    return APIMethods.post(ENDPOINTS.FORGOT_PASSWORD,params)
                                        
    }
static resetPassword=async(params)=>{
    return APIMethods.post(ENDPOINTS.RESET_PASSWORD,params)
                                            
    }

static fetchDeniedForms=async(params)=>{
    return APIMethods.post(ENDPOINTS.FETCH_DENIED_FORMS,params)
        
    }
static fetchMissedForms=async(params)=>{
    return APIMethods.post(ENDPOINTS.FETCH_MISSED_FORMS,params)
            
    }
   
static getLogs=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_LOGS,params)
                
    }
static getFormStatus=async(params)=>{
     return APIMethods.post(ENDPOINTS.GET_FORMS_STATUS,params)
                    
     }
static getFormStats=async(params)=>{
    return APIMethods.post(ENDPOINTS.GET_FORM_STATS,params)
                        
    }
static makeLogEntry=async(params)=>{
    return APIMethods.post(ENDPOINTS.MAKE_LOG_ENTRY,params)
                            
    }
static raiseTicket=async(params)=>{
    return APIMethods.post(ENDPOINTS.RAISE_TICKET,params)
                                
    }
                       
static reviewReq=async(params)=>{
    return APIMethods.post(ENDPOINTS.REVIEW_REQUEST,params)
                                    
    }
static acceptReq=async(params)=>{
    return APIMethods.post(ENDPOINTS.ACCEPT_REQUEST,params)
                                        
    }
static denyReq=async(params)=>{
    return APIMethods.post(ENDPOINTS.DENY_REQUEST,params)
                                            
    }

  }

  export default APIManager; 
