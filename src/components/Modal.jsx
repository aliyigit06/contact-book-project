import React from 'react'
import { IoMdClose } from "react-icons/io";
import Field from "./Field";
import axios from 'axios';
const Modal = ({isModelOpen,  setIsModelOpen,
  setContacts, editItem, setEditItem,}) => {

      // ! Modal içerisinde yer alan form gönderildiğinde çalışacak fonksiyon
      const handleSubmit =async (e) => {
          // Sayfa yenilenmesini engelle
          e.preventDefault();


       // Javascript içerisinde yer alan formData yapısı sayesinde birden çok inputun değerlerini teker teker almak yerine bunu tek seferde yapabiliriz.
      const formData = new FormData(e.target);


       // formData.entries() metodu inputlardan gelen değerleri bir dizisi şeklinde dönderir.Bizde burada inputlar içerisindeki değerler ile bir yeni kişi verisi elde ettik
       const newContact = Object.fromEntries(formData.entries());

       // Eğer güncellenecek eleman yoksa

       if(!editItem) {
        // Elde edilen yeni kişi verisini api'a gönder
       const response = await axios.post(
        "http://localhost:3000/contact",
        newContact
      );

      // Api'a post isteği ile eklenen kişiyi alıp contacts state'ine aktar.Bu işlem yapılmazsa sayfa yenilenene kadar yeni eklenen kullanıcı ekranda gözükmez

      // Yeni eklenen kişiyi contacts state'ine eklerken öncesinde bulunan kişileri ...contacts ile koru üzerine yeni eklenecek kişiyi ekle
      setContacts((contacts)=>[...contacts,response.data]);
      } else {
        // Güncelleme işlemi
        // Api'a güncelleme işlemi için istek at
        const response = await axios.put( `http://localhost:3000/contact/${editItem.id}`,
        newContact);
         // Contacts state'ini dön eğer güncellenecej elemanın id'si bir elemanlar eşleşiyorsa o zaman güncellenen değeri return et yoksa mevcut değeri return et
         setContacts((contacts)=> contacts.map((contact) => contact.id === editItem.id ? response.data :contact))


         // editItem state'ini null'a çek
         setEditItem(null);
      }

        // Modal'ı kapat
         setIsModelOpen(false);
      }

  return (
     isModelOpen &&(<div className='modal'>
        {/* Modal Inner */}
        <div className='modal-inner'>
         {/* Head */}
         <div className='modal-head'>
            <h1>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"}</h1>

           <button
              onClick={() => {
                // Modal'ı kapat
                setIsModelOpen(false);
                // editItem state'ini null'a çek
                setEditItem(null);
              }}
            >
              <IoMdClose />
            </button>
         </div>

           {/* Form */}
           <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim" name="name" />
            <Field value={editItem?.surname} label="Soyisim" name="surname" />
            <Field value={editItem?.company} label="Şirket" name="company" />
            <Field value={editItem?.phone} label="Telefon" name="phone" />
            <Field value={editItem?.email} label="Email" name="email" />
            <Field value={editItem?.position} label="Position" name="position"
            />

            <div className="buttons">
               <button
                onClick={() => {
                  // Modal'ı kapat
                  setIsModelOpen(false);
                  // editItem state'ini null'a çek
                  setEditItem(null);
                }}
              >
                Vazgeç
              </button>
               <button type="submit">
                {editItem ? "Güncelle" : "Kayıt Et"}
              </button>
            </div>
           </form>
        </div>
    </div>
  )) 
}

export default Modal
