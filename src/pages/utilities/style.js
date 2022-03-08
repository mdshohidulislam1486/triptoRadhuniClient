import { makeStyles } from '@mui/styles'




const useStyles = makeStyles({

    navBar:{
        backgroundColor:'#203040',
        '& a':{
            color:'#ffff',
            marginLeftZ:10
        },
    },
    main:{
        minHeight:"80vh"
    },
    footer:{
        backgroundColor:'#203040',
        marginTop:'2em',
        alignItems:'center'
    },
    section:{
        marginTop:'2em',
        marginBottom:'1em',
    },
    addProduct:{
      
        '& > *':{
            marginBottom:'.2rem',
            borderRadius:3,

        }
    },
    chekOut:{
        backgroundColor:'transparent'
    },
  
})

export default useStyles;