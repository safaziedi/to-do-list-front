import Button from './Button'
const Header = ({title, onClickAdd,show }) => {

  return (
    <header className="header">
      <h1 style={monstyle}>{title ? title : 'valeur par defaut'}</h1>
      <Button color={!show  ? "green" : "red"} 
      description={!show ? "add" : "sub"} onClick={onClickAdd}/>
    </header>
  )
}

const monstyle={color:'red'}

export default Header