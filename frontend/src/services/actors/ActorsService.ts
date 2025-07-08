import API from '../../libs/api';
 
export const deleteActor = async (actorId: string) => {
  return API.delete(`/actors/${actorId}`);
}; 