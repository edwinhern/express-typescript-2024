import { Response } from 'express';

import { ServiceResponse } from '~/common/models/serviceResponse';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  if (!serviceResponse.success) {
    return response.status(500).send(serviceResponse);
  }
  return response.status(200).send(serviceResponse);
};
