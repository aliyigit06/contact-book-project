import React, { useEffect, useState } from 'react'
import { RiSearchLine } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosPersonAdd } from "react-icons/io";
import axios from 'axios';
import Card from './components/card';
import Modal from './components/Modal';




const App = () => {
// Contact state'inin kurulumu
const [contacts, setContacts] = useState([]);

// Güncellenecek eleman için state
const [editItem, setEditItem] = useState(null);

// Modal'ın açılıp kapanmasını sağlayacak state
const [isModelOpen , setIsModelOpen] = useState(false);

// Bileşen ekrana geldiği anda api isteği at
useEffect(()=>{
  axios.get("http://localhost:3000/contact").then((res)=>setContacts(res.data))
},[])

  // ! Form gönderildiğinde çalışacak fonksiyon
   
  const handleSubmit = (e)=> {
    // Sayfa yenilenmesini engelle
    e.preventDefault();

    // Form içersinden aranacak kelimenin elde edilmesi
    const query = e.target[1].value;

    // Api'a geçilecek parametrenin hazırlanması

      const params = {
        q : query,
      };

    // Oluşturulan parametrelerle api isteği at
    // Gelen veriyi ise contacts state'ine aktar
    axios.get("http://localhost:3000/contact",{params}).then((res)=> setContacts(res.data))
    
 }

  // ! Silme işlemini gerçekleştiren fonksiyon

  const handleDelete = (id) => {
    // Kullanıcıdan silme işlemi için onay al
     const response = confirm("Kişiyi silmek istediğinize emin misiniz?");

       // Eğer kullanıcı silme işlemi için onay verdiyse bu kullanıcıyı silmek için api'a istek at
       if(response) {
         // api'a silme isteği at
         axios.delete(`http://localhost:3000/contact/${id}`).then(()=> {
            // ! Eğer api'dan kullanıcı silindiyse arayüzden'de bu kullanıcıyı kaldır

        // Silinen kişiyi contacts state'inden kaldır
        const updatedContacts = contacts.filter((contact) => contact.id != id );

           // Güncel kişileri contacts state'ine aktar
           setContacts(updatedContacts);
         })
       }

  }

    // ! Güncelleme işlemi yapan fonksiyon

    const handleUpdate = (item) => {
    // Modal'ı aç
    setIsModelOpen(true);

    setEditItem(item);
    }

  return (
    <div className='app'>
        {/* Header */}
        <header>
         {/* Logo */}
        <h1>Rehber</h1>

        <div>
             {/* Form */}

           <form onSubmit={handleSubmit} >
            <button>
              <RiSearchLine />
            </button>

            <input type="search" placeholder="Kişi aratınız ..." />
          </form>

            {/* Buttons */}

               <button className="ns">
            <IoIosMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>
          <button onClick={() => setIsModelOpen(true) }  className="add">
            <IoIosPersonAdd className="icon" />
            <span>Yeni Kişi</span>
          </button>
        </div>
        </header>
      
   <main>   {contacts.map((item)=><Card 
   key={item.id} 
   item={item}  
   handleDelete={handleDelete} 
   handleUpdate = {handleUpdate} />)}</main>


  {/* Modal */}

   <Modal isModelOpen={isModelOpen} 
   setIsModelOpen = {setIsModelOpen} 
   setContacts={setContacts}  
   editItem={editItem}
    setEditItem={setEditItem} 
    />
    </div>
  )
}

export default App
