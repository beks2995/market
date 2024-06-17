import React, { useState } from 'react'
import { getFirestore, collection, addDoc, setDoc, getDoc, doc, DocumentReference } from 'firebase/firestore'
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

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

const firestore = getFirestore()

const categories = [
  'Headphones', 'Wireless-Headphones', 'Apple', 'Asus', 'Blackview', 'Cat', 'HMD', 'Honor', 'HTC', 'HUAWEI',
  'Infinix', 'INOI', 'Itel', 'Lenovo', 'LG', 'Meizu', 'Nokia', 'Nubia','OnePlus', 'Oppo', 'Realme', 'Samsung', 'Sony', 'Tecno', 'Ulefone',
  'Vivo', 'Vsmart', 'XIAOMI', 'ZTE'
] 

const AddDataForm: React.FC = () => {
  const [device, setDevice] = useState<Device>({
    name: '',
    price: '',
    priceWithDiscount: '',
    images: '',
    description: '',
    stock: 100,
  });

  const [categoryRef, setCategoryRef] = useState<DocumentReference | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'category') {
      const categoryCollectionRef = collection(firestore, 'categories');
      const categoryDocRef = doc(categoryCollectionRef, value);
      setCategoryRef(categoryDocRef);
    } else {
      setDevice((prevState: Device) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      try {
        const base64Imgs = await Promise.all(Array.from(files).map(file => toBase64(file)));
        setImages(base64Imgs);
      } catch (error) {
        console.error("ошибка при преобразовании изображения в base64: ", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (categoryRef) {
        const categoryDocSnapshot = await getDoc(categoryRef);

        if (!categoryDocSnapshot.exists()) {
          await setDoc(categoryRef, { name: categoryRef.id });
        }

        const itemsCollectionRef = collection(firestore, 'items');
        const newItemRef = await addDoc(itemsCollectionRef, {
          ...device,
          images: images,
          categoryId: categoryRef,
        });

        setDevice({
          name: '',
          price: '',
          priceWithDiscount:'',
          images: '',
          description: '',
          stock: 100,
        });

        setImages([]);
        setCategoryRef(null);
      } else {
        console.error("Ошибка: категория не выбрана.");
      }
    } catch (error) {
      console.error("Ошибка при добавлении устройства: ", error);
    }
  };

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
          price={device.price}
          priceWithDiscount={device.priceWithDiscount}
          onChange={handleChange}
        />
        <CategorySelect
          categories={categories}
          value={categoryRef ? categoryRef.id : ''}
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
