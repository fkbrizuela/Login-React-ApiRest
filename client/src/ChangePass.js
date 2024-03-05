import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const ChangePass = () => {
  const [contraseñaActual, setContraseñaActual] = useState("")
  const [contraseñaNueva, setContraseñaNueva] = useState("")
  const [confirmaContraseña, setConfirmaContraseña] = useState("")
  const [error, setError] = useState(0)
  const url = "http://localhost:3001/cambio_contrasena"
  const redirect = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()

  const usuario = Cookies.get("usuario");

  if (usuario === null) {
    setError(4)
  }

  if (contraseñaActual === null || contraseñaNueva === null) {
    setError(2)
    return
  }

  if (contraseñaActual.trim().length === 0 || contraseñaNueva.trim().length === 0) {
    setError(2)
    return
  }

  if (contraseñaNueva !== confirmaContraseña) {
    setError(3)
    return;
  }

  const data = {
    nombre: usuario,
    contraseña_actual: contraseñaActual,
    contraseña_nueva: contraseñaNueva,
    confirma_contraseña: confirmaContraseña
  }

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response === null) {
    setError(-1)
    return
  }

  const resdata = await response.json();

  if (resdata.message === "ok") {
    setError(1)
    redirect('/Home')
  } else {
    setError(3)
  }
}

const errorSwitch = () => {
  switch(error) {
    case 0:
      return <p> </p>
    case 1:
      return <p className="text-align-center"> bienvenido</p>
    case 2:
      return <p> Todos los campos son obligatorios</p>
    case 3:
      return <p> Las contraseñas no coinciden</p>
    case 4:
      return <p> No está iniciado sesión</p>
    default:
      return <p> Error desconocido o de red</p>;
  }
}

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25'>
      <h2>Cambio de contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password"><strong>Contraseña actual</strong></label>
          <input type="password" placeholder="Contraseña actual" className="form-control rounded-0" value={contraseñaActual}
            onChange={e=>setContraseñaActual(e.target.value)}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Contraseña nueva</strong></label>
          <input type="password" placeholder="Contraseña nueva" className="form-control rounded-0" value={contraseñaNueva}
            onChange={e=>setContraseñaNueva(e.target.value)}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Confirma contraseña</strong></label>
          <input type="password" placeholder="Confirma contraseña" className="form-control rounded-0" value={confirmaContraseña}
            onChange={e=>setConfirmaContraseña(e.target.value)}
            />
        </div>
        <button className="btn btn-success w-100 rounded-0 mb-4"><strong>Cambiar</strong></button>
      </form>
      <Link to='/' className='btn btn-default border w-100 bg-light rounded-0'>Volver</Link>
      {errorSwitch()} 
    </div>
  </div>
  )
}
export default ChangePass
