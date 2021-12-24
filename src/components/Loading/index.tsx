import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#222',
        position: 'absolute',
      }}
    >
      <LinearProgress
        sx={{
          marginTop: 50,
          width: '80%',
          marginX: 'auto',
        }}
      />
      <LinearProgress
        sx={{
          marginTop: 2,
          width: '80%',
          marginX: 'auto',
        }}
        color="secondary"
      />
      <LinearProgress
        sx={{
          marginTop: 2,
          width: '80%',
          marginX: 'auto',
        }}
        color="info"
      />
    </Box>
  );
}
