import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"

const Signup = () => {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [confirmaContraseña, setConfirmaContraseña] = useState("")
  const [error, setError] = useState(0)
  const url = "http://localhost:3001/nuevo_usuario"
  const redirect = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  if (nombre === null || contraseña === null || confirmaContraseña === null) {
    setError(2)
    return
  }

  if (nombre.trim().length === 0 || contraseña.trim().length === 0) {
    setError(2)
    return
  }

  if (contraseña !== confirmaContraseña) {
    setError(3)
    return;
  }

  const data = {
    nombre: nombre,
    contraseña: contraseña,
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
    default:
      return <p> Error desconocido o de red</p>;
  }
}

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25'>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre"><strong>Nombre</strong></label>
          <input type="text" placeholder="Ingresar Nombre" className="form-control rounded-0" value={nombre}
            onChange={e=>setNombre(e.target.value)}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Contraseña</strong></label>
          <input type="password" placeholder="Contraseña" className="form-control rounded-0" value={contraseña}
            onChange={e=>setContraseña(e.target.value)}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Confirma contraseña</strong></label>
          <input type="password" placeholder="Confirma contraseña" className="form-control rounded-0" value={confirmaContraseña}
            onChange={e=>setConfirmaContraseña(e.target.value)}
            />
        </div>
        <button className="btn btn-success w-100 rounded-0"><strong>Crear</strong></button>
      </form>
      <p>Usted de acuerdo con nuestros términos y condiciones</p>
      <Link to='/' className='btn btn-default border w-100 bg-light rounded-0'>Login</Link>
      {errorSwitch()} 
    </div>
  </div>
  )
}
export default Signup
