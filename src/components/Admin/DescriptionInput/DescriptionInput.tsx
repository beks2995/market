import './DescriptionInput.css'

interface DescriptionInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const DescriptionInput = ({ value, onChange }:DescriptionInputProps) => {
  return (
    <textarea
      className='description'
      name="description"
      placeholder="Описание"
      value={value}
      onChange={onChange}
    />
  )
}

export default DescriptionInput
