

const ReturnCarManagement = () => {
    return (
        <div className="overflow-x-auto shadow-xl rounded w-full m-4">
      <table className="table ">
        {/* head */}
        <thead className="text-xl">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Car Details</th>
            <th>currently</th>
            <th>Price Per Hour</th>
            <th>
              <button className="btn-ghost">Action</button>
            </th>
          </tr>
        </thead>
        <tbody className="mb-4">
          {/* row 1 */}
          {/* {carData &&
            carData?.data.map((item: any) => (
              <tr key={item._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.photo} alt={item?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                      <div className="text-sm opacity-50">{item?.color}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{item.status}</td>
                <td className="text-center font-semibold">{item?.pricePerHour}</td>
                <th>
                  <div className="flex items-center ">
                  <button  className="p-2 m-2">
                   <Link to={`/cars/${item._id}`}>
                  <BiDetail className="text-2xl cursor-pointer hover:text-yellow-500"/>
                  </Link>
                  </button>
                  <button
                    className="px-4 py-2"
                    onClick={() => handleOpenModal(item)}
                  >
                    <FaRegEdit className="text-xl hover:text-yellow-500" />
                  </button>
                  <button className="p-2 m-2" onClick={() => handleDeleteCar(item._id)}>
                  <MdDeleteForever className="text-2xl cursor-pointer hover:text-yellow-500"/>
                  </button>
                  </div>
                </th>
              </tr>
            ))} */}
        </tbody>
      </table>

    </div>
    );
};

export default ReturnCarManagement;