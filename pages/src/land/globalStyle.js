 
import { createGlobalStyle} from "styled-components"


 const GlobalStyles= createGlobalStyle`
body {
  --backColor:${({ theme }) => theme.backColor};
  --borColor:${({ theme }) => theme.borColor};
  --boxShad:${({ theme }) => theme.boxShad};
  --linkHolderColor:${({ theme }) => theme.linkHolderColor};
  --headerPriColor:${({ theme }) => theme.headerPriColor};
  --headerSecColor:${({ theme }) => theme.headerSecColor};
  --headColor:${({ theme }) => theme.headColor};
  --buttonBackColor:${({ theme }) => theme.buttonBackColor};
  --headBugerColor:${({ theme }) => theme.headBugerColor};
  --cardColor:${({ theme }) => theme.cardColor};
  --smallCardColor:${({ theme }) => theme.smallCardColor};
}
`

export default GlobalStyles;