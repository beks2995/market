import { useState } from 'react'
import './ImageInput.css'

interface ImageInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  const [fileNames, setFileNames] = useState<string[]>(['Выберите изображения'])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFileNames = Array.from(files).map(file => file.name)
      setFileNames(newFileNames)
    }
    onChange(e)
  }

  return (
    <div className="image-input-container">
      <input
        id="file-upload-button"
        type="file"
        accept="image/*"
        multiple
        onChange={handleInputChange}
      />
      <label htmlFor="file-upload-button" className="custom-file-upload">
        {fileNames.join(', ')}
      </label>
    </div>
  )
}

export default ImageInput
