 
import { createGlobalStyle} from "styled-components"


 const GlobalStyles= createGlobalStyle
 `
     ${(props) =>props.light?`
     body{
                         
               --pri-dark: #11E4D1;
               --sec-dark:#fff;
               --warning:#EEC485;
               --danger:#EB445A;
               --succ:#8FDE82;
               --text-s1:#000;
               --text-s2:#63798E;
               --margin:20px;
               

               --pri-color:#4189F7;
               --dark-pri-color:#f3f3f3;
               --dark-sec-color:#e0e0e0;
               --welcomeCardHeight:120px;

               --margin-top:22px;
               --margin-bottom:22px;

               --bor-rad:10px;

               --textBoxBackColor:#fff;
               --buttonBackColor:#e0e0e0;
               --buttonBackColor-selec:#bdbdbd;

               --welcomeMotoText:#fff;
               --textColor:#212121;
               --subtextColor:#353535;
               --subHeadingTextColor:#555555;
               --backColor:var(--dark-pri-color);
               --borColor:#e0e0e0;
               --boxShad:0 3px 14px 0px rgba(0,0,0,0.09);
               
               --linkHolderColor:var(--dark-pri-color);
               --cardColor:#f7f7f7;
               --cardSubColor:#f3f3f3;
               --cardTextColor:#000;
               --cardButtBackColor:#e0e0e0;

               --headerPriColor:rgb(132, 126, 126);
               --headerSecColor:#000;
               --headerTextColor:#858585;
               --headColor:#fff;
               

               --subHeaderBackColor:#f1f1f1;

               --NavheadColor:#fff;
               --NavTextColor:#959595;
               --NavTextColor-selec:#4189F7;
               
               --BugerCrossColor:#959595;
               --BurgerMenuColor:#181818;


               
               --smallCardColor:#f5f5f5;
               --box-shad: 0 3px 10px 2px rgba(0,0,0,0.1);
     }
     `:`
     body{
             
          --pri-color:#4189F7;
          --dark-pri-color:#101010;
          --dark-sec-color:#3a3b3c;
          --welcomeCardHeight:120px;
     
          --margin-top:22px;
          --margin-bottom:22px;
     
          --bor-rad:10px;
          --back-color:#fff;
     
     
     
          --textBoxBackColor:#292929;
          --buttonBackColor:#292929;
          --buttonBackColor-selec:#363636;
     
          --welcomeMotoText:#fff;
          --textColor:#e4e6eb;
          --subtextColor:#656565;
          --subHeadingTextColor:#909090;
          --backColor:var(--dark-pri-color);
          --borColor:#202020;
          --boxShad:0 3px 14px 0px rgba(0,0,0,0.3);
          
          --linkHolderColor:var(--dark-pri-color);
          --linkHolderColor:#171717;
     
          --cardColor:#191919;
          --cardSubColor:#282828;
          --cardTextColor:#bdbdbd;
          --cardButtBackColor:#303030;
     
          --headerPriColor:#000;
          --headerSecColor:#000;
          --headColor:#191919;
          
     
          --subHeaderBackColor:#151515;
     
          --NavheadColor:#191919;
          --NavTextColor:#959595;
          --NavTextColor-selec:#4189F7;
          
          --BugerCrossColor:#959595;
          --BurgerMenuColor:#181818;
     
     
          
          --smallCardColor:#f5f5f5;
          --box-shad: 0 3px 10px 2px rgba(0,0,0,0.2);
        }
     `}  
 

`

export default GlobalStyles;

