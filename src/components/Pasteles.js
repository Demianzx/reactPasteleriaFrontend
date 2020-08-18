import React, {useState,useEffect} from 'react'

const API = process.env.REACT_APP_PASTELES;

export const Pasteles = () => {

    const[sabor,setSabor] = useState('')
    const[precio,setPrecio] = useState('')
    const[tamano,setTamano] = useState('')

    const[editing,setEditng]= useState(false)
    const[id,setId]= useState('')

    const [pasteles,setPasteles]=useState([])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!editing){    
            const resp = await fetch(`${API}`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sabor,
                    precio,
                    tamano
                })
            })
            const data = await resp.json();
            console.log(data)
        }else {
            const res = await fetch(`${API}/${id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sabor,
                    precio,
                    tamano
                })
            })
            const data = await res.json();
            console.log(data)
            setEditng(false);
            setId('')
        }


        await getUsers();
        setSabor('');
        setPrecio('');
        setTamano('');
    }

    const getUsers = async () =>{
        const res = await fetch(`${API}`)
        const data = await res.json();
        setPasteles(data)
    }

    useEffect(() =>{
        getUsers()
    },[])

    const borrarPastel= async (id)=>{
       const userResponse = window.confirm('Estas seguro de eliminar el pastel?')
       if (userResponse){
        const res = await fetch(`${API}/${id}`, {
            method:'DELETE'
            })
        const data = await res.json();
        console.log(data)
        await getUsers();
       }
    }


    const editarPastel=async(id)=>{
        const res = await fetch(`${API}/${id}`)
        const data = await res.json();

        setEditng(true);
        setId(id)

        setSabor(data.sabor)
        setPrecio(data.precio)
        setTamano(data.tamano)
        console.log(data)
        
    }

    return(
        <div className="row">
            <div className="col-md-4" > 
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                      <input 
                        type="text" 
                        onChange={e => setSabor(e.target.value)} 
                        value = {sabor}
                        className="form-control"
                        placeholder="Sabor"
                        autoFocus/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="number" 
                        onChange={e => setPrecio(e.target.value)} 
                        value= {precio}
                        className="form-control"
                        placeholder="Precio"
                        autoFocus/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        onChange={e => setTamano(e.target.value)} 
                        value= {tamano}
                        className="form-control"
                        placeholder="Tamaño"
                        autoFocus/>
                    </div>
                    <button className="btn btn-primary">
                        {editing ?  'Editar': 'Crear'}
                    </button>

                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                         <tr>
                         <th>Sabor</th>
                         <th>Precio</th>
                         <th>Tamaño</th>
                         <th>Operaciones</th>
                         </tr>
                    </thead>
                    <tbody>
                    {pasteles.map(pastel =>(
                        <tr key={pastel._id}>
                            <td>{pastel.sabor}</td>
                            <td>${pastel.precio}</td>
                            <td>{pastel.tamano}</td>
                            <td>
                                <button 
                                className="btn btn-secondary btn-sm btn-block"
                                onClick={e=> editarPastel(pastel._id)}
                                >
                                    Editar
                                </button>
                                <button 
                                className="btn btn-danger btn-sm btn-block"
                                onClick={()=>borrarPastel(pastel._id)}
                                >
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}