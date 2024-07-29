import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

import { toast } from 'react-toastify';
import APIManager from '../../APIManager/APIManager'
const {fid, setfid}=useContext(fidContext);
const {manhours,setmanhours}=useContext(ManhoursContext);

const {ym,setym}=useState(YMContext)

const {gri1,setgri1}=useContext(Gri1Context);
const {gri2,setgri2}=useContext(Gri2Context);
const {gri3,setgri3}=useContext(Gri3Context);
const {gri5,setgri5}=useContext(Gri5Context);
const {gri6,setgri6}=useContext(Gri6Context);

export default function EmptyTextarea() {
    const navigate = useNavigate();
  function clearStorage(){
    setfid(null);
    setmanhours(null);
    setym(null)
    setgri1(null);
    setgri2(null);
    setgri3(null);
    setgri5(null);
    setgri6(null);
  }
  const handleSubmit =async (value) => {
    try {
    if(text.length===0){
        toast.error("Please enter a remark!");
        return;
    }
        const results = 
APIManager.submitRemark({
  fid:fid,

  remarks:text
})
        toast.success("Form has been denied successfully!");
        setTimeout(() => {            clearStorage();
          navigate("/grading"); }, 0);
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
  const [text, setText] = React.useState('');
  return (
    <FormControl>
      <FormLabel>Your Remarks</FormLabel>
      <Textarea
        placeholder="Type something here…"
        minRows={3}
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
                              <Typography level="body-xs" sx={{ ml: 'auto' }}>
                  {text.length} character(s)
                </Typography>
            
            <Button sx={{ ml: 'auto' }} onClick={handleSubmit}>Send</Button>
          </Box>

        }
        sx={{
          minWidth: 300,
          fontWeight:'normal',
          fontStyle: 'initial',
        }}
      />
    </FormControl>
  );
}
