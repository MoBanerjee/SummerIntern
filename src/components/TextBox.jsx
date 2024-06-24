import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function EmptyTextarea() {
    const navigate = useNavigate();
  function clearStorage(){
    localStorage.setItem('fid',null);
    localStorage.setItem('manhours',null);
    localStorage.setItem('ym',null);
    localStorage.setItem('gri1',null);
    localStorage.setItem('gri2',null);
    localStorage.setItem('gri3',null);
    localStorage.setItem('gri5',null);
    localStorage.setItem('gri6',null);
  }
  const handleSubmit =async (value) => {
    try {
    if(text.length===0){
        toast.error("Please enter a remark!");
        return;
    }
        const results = await axios.post(`http://localhost:3000/submitRemark`, {

fid:JSON.parse(localStorage.getItem("fid")),

remarks:text
        });

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
