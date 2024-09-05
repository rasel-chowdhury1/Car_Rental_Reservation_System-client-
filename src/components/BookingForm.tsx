
import { Form, FormGroup } from "reactstrap";


const BookingForm = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={submitHandler} className="flex flex-wrap gap-4">
      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="text"
          placeholder="First Name"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="text"
          placeholder="Last Name"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="email"
          placeholder="Email"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="number"
          placeholder="Phone Number"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="text"
          placeholder="From Address"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="text"
          placeholder="To Address"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <select
          name=""
          id=""
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        >
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <select
          name=""
          id=""
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        >
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </select>
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="date"
          placeholder="Journey Date"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full md:w-1/2 lg:w-[47.5%]">
        <input
          type="time"
          placeholder="Journey Time"
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
        />
      </FormGroup>

      <FormGroup className="w-full">
        <textarea
          rows={5}
          className="w-full py-2 px-3 border border-[#7c8a972a] text-[#7c8a97] rounded-md focus:outline-none"
          placeholder="Write"
        ></textarea>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
