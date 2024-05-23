import React, { useState } from 'react'
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import ImageInput from '../ImageInput/ImageInput'
import TextInput from '../TextInput/TextInput'
import CategorySelect from '../CategorySelect/CategorySelect'
import PriceInput from '../PriceInput/PriceInput'
import DescriptionInput from '../DescriptionInput/DescriptionInput'
import toBase64 from '../toBase64'
import { Device } from '../../../types'
import './AddDataForm.css'

const firebaseConfig = {
  apiKey: "AIzaSyBpkI7FYDX6HtmBv9NUe330rF1pYSREOwo",
  authDomain: "market-51d48.firebaseapp.com",
  databaseURL: "https://market-51d48-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "market-51d48",
  storageBucket: "market-51d48.appspot.com",
  messagingSenderId: "232919272449",
  appId: "1:232919272449:web:68862e13635832dabb4400"
}

// Initialize Firebase only if no apps are already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig)
}

const firestore = getFirestore()

const categories = [
  'Headphones', 'Wireless-Headphones', 'Apple', 'Asus', 'Blackview', 'Cat', 'HMD', 'Honor', 'HTC', 'HUAWEI',
  'Infinix', 'INOI', 'Itel', 'Lenovo', 'LG', 'Meizu', 'Nokia', 'Nubia','OnePlus', 'Oppo', 'Realme', 'Samsung', 'Sony', 'Tecno', 'Ulefone',
  'Vivo', 'Vsmart', 'XIAOMI', 'ZTE'
];

const AddDataForm: React.FC = () => {
  const [device, setDevice] = useState<Device>({
    name: '',
    priceBeforeDiscount: '',
    priceAfterDiscount: '',
    category: '',
    img: '',
    description: '',
    inFavorite: false,
    inBasket: false,
    estimation: '5'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDevice((prevState: Device) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Img = await toBase64(file);
        setDevice((prevState: Device) => ({
          ...prevState,
          img: base64Img
        }))
      } catch (error) {
        console.error("ошибка при преобразовании изображения в base64: ", error);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const productsCollectionRef = collection(firestore, 'products')
    const productDocRef = doc(productsCollectionRef, 'product_id')

    try {
      const productDocSnapshot = await getDoc(productDocRef)
      if (!productDocSnapshot.exists()) {
        await setDoc(productDocRef, {})
      }

      const categoryName = device.category.trim()
      if (!categoryName) {
        console.error('Имя категории пусто')
        return
      }

      const categoryCollectionRef = collection(productDocRef, categoryName)

      await addDoc(categoryCollectionRef, {
        ...device,
        inFavorite: false,
        inBasket: false,
      })

      setDevice({
        name: '',
        priceBeforeDiscount: '',
        priceAfterDiscount: '',
        category: '',
        img: '',
        description: '',
        inFavorite: false,
        inBasket: false,
        estimation: '5'
      })
    } catch (error) {
      console.error("Ошибка при добавлении устройства: ", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="name"
        placeholder="Наименование"
        value={device.name}
        onChange={handleChange}
      />
      <div className="container__priceInput">
        <PriceInput
          priceBeforeDiscount={device.priceBeforeDiscount}
          priceAfterDiscount={device.priceAfterDiscount}
          onChange={handleChange}
        />
        <CategorySelect
          categories={categories}
          value={device.category}
          onChange={handleChange}
        />
      </div>
      <ImageInput
        onChange={handleImageChange}
      />
      <DescriptionInput
        value={device.description}
        onChange={handleChange}
      />
      <button className='addDataForm__btn' type="submit">Добавить устройство</button>
    </form>
  )
}

export default AddDataForm
