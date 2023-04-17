import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Tables = () => {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const columns = [
    {
      name: "city",
      selector: (row) => row.city,
      sortable: true,
    },
    { name: "state", selector: (row) => row.state, sortable: true },
    { name: "country", selector: (row) => row.country, sortable: true },
    { name: "latitude", selector: (row) => row.latitude, sortable: true },
    { name: "longitude", selector: (row) => row.longitude, sortable: true },
  ];

  const getData = async () => {
    const url = "https://randomuser.me/api/?results=20";

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.results);

    const changedData = data.results.map((item) => ({
      city: item.location.city,
      state: item.location.state,
      country: item.location.country,
      latitude: item.location.coordinates.latitude,
      longitude: item.location.coordinates.longitude,
    }));

    setData(changedData);
    setFilterData(changedData);
  };
  useEffect(() => {
    getData();
  }, []);
  //   useEffect(() => {
  //     const filtered = Data.filter((eachData) => {
  //       return eachData.country.toLowerCase().match(search.toLowerCase());
  //     });
  //     setFilterData(filtered);
  //   }, [search]);
  const handleFilter = (event) => {
    const newData = Data.filter((row) =>
      row.city.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilterData(newData);
  };

  return (
    <>
      <input type="text" placeholder="search" onChange={handleFilter} />
      <DataTable
        title="Details"
        columns={columns}
        data={filterData}
        subHeaderAlign="center"
        value={search}
      />
      )
    </>
  );
};

export default Tables;
