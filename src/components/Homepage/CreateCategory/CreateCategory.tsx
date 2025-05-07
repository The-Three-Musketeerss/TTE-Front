import Button from "@components/shared/Button/Button"
import BaseInput from "@components/shared/BaseInput/BaseInput"

const CreateCategory = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
        <h3 className="text-2xl mb-7">Create Category</h3>
        <form>
          <BaseInput label="Name"/>
        </form>
       <Button text="Add"/>
    </div>
  )
}

export default CreateCategory