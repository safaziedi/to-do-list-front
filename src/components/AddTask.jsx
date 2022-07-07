import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [description, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!description) {
      alert('Please add a task')
      return
    }

    onAdd({ description, day, reminder })

      //il réinialise
    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='description'
          placeholder='Add Task'
          value={description}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='description'
          placeholder='Add Day & Time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask