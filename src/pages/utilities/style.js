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
        textAlign:'center',
        marginTop:'5em'
    },
    section:{
        marginTop:'1em',
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
    }
})

export default useStyles;