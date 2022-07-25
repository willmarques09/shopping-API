/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express'; // tipagem

import CreateCustomerService from '../services/customers/createCustomerService';
import DeleteCustomerService from '../services/customers/deleteCustomerService';
import ListCustomerService from '../services/customers/listCustomerService';
import ShowCustomerService from '../services/customers/showCustomerService';
import UpdateCustomerService from '../services/customers/updateCustomerService';

class CustomerContoller {
  public async list(req: Request, res: Response) {
    const listCustomers = new ListCustomerService();

    const customer = await listCustomers.list(); // lista todos produtos

    return res.json(customer);
  }

  public async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // base_url/products/:o ID que vc quer deletar

    const showCustomers = new ShowCustomerService();

    const customer = await showCustomers.listById({ id });

    return res.json(customer);
  }
  public async create(req: Request, res: Response) {
    const { name, email } = req.body; // body e passado no corpo da requisiçao geramente com json

    const createCustomers = new CreateCustomerService();

    const customer = await createCustomers.create({
      name,
      email,
    });
    return res.json(customer); // se tudo tiver nos parametro cria se um produto
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body; // corpo da requisicao por json
    const { id } = req.params; // passado no parametro

    const updateCustomers = new UpdateCustomerService();

    const customer = await updateCustomers.update({
      id, // onde id e passa no parametro
      name, // sao passado no corpo da requisicao sendo json
      email,
    });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // base_url/products/:o ID que vc quer deletar

    const deleteCustomers = new DeleteCustomerService();

    await deleteCustomers.delete({ id });
    return res.status(200).json({ message: 'Customer removed successfully' });
  }
}

export { CustomerContoller };
