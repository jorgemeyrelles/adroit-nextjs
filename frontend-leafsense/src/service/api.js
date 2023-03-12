import axios from "axios";

const login = async (login) => {
  const { data: { access_token } } = await axios.post(process.env.REACT_APP_LOGIN, login);
  // console.log('api', access_token);
  return access_token;
};

const clients = async (token) => {
  const clients = await axios.get(`${process.env.REACT_APP_API}get_farms_by_client/`,
    { headers: { "Authorization": `Bearer ${token}` } });
  return clients.data;
};

const farmById = async (token, id) => {
  const farm = await axios.get(`${process.env.REACT_APP_API}get_block_info_by_farm/?farm_id=${id}`,
    { headers: { "Authorization": `Bearer ${token}` } });
  return farm.data;
};

export {
  login,
  clients,
  farmById,
  // fruitCount,
};
