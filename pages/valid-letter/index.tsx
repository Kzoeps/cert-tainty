import { background } from '@chakra-ui/react'
import Swal from 'sweetalert2'

export default function ValidLetter() {
  Swal.fire({
    title: 'Done!',
    text: 'Do you want to continue',
    icon: 'success',
    confirmButtonText: 'Cool'
  })
  return(
    <div 
    style={{height: '95vh', backgroundSize: "cover", backgroundImage: "url(https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2116&q=80)"}}>

    </div>
    )
}
