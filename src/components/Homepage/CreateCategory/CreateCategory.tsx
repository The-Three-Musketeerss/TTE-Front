import Button from "@components/shared/Button/Button"

const CreateCategory = () => {
  return (
    <div>
        <h3>Create Category</h3>
        <form>
          <h5>Name</h5>
          <input type="text" />  
        </form>
       <Button text="Add"/>
    </div>
  )
}

export default CreateCategory