/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express'; // tipagem
import { container } from 'tsyringe';

import CreateCustomerService from '../services/customers/createCustomerService';
import DeleteCustomerService from '../services/customers/deleteCustomerService';
import ListCustomerService from '../services/customers/listCustomerService';
import ShowCustomerService from '../services/customers/showCustomerService';
import UpdateCustomerService from '../services/customers/updateCustomerService';

class CustomerContoller {
  public async list(req: Request, res: Response) {
    const listCustomers = container.resolve(ListCustomerService);
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const customer = await listCustomers.list({ page, limit });

    return res.json(customer);
  }

  public async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // base_url/products/:o ID que vc quer deletar

    const showCustomers = container.resolve(ShowCustomerService);

    const customer = await showCustomers.listById(id);

    return res.json(customer);
  }
  public async create(req: Request, res: Response) {
    const { name, email } = req.body; // body e passado no corpo da requisiçao geramente com json

    const createCustomers = container.resolve(CreateCustomerService);

    const customer = await createCustomers.create({
      name,
      email,
    });
    return res.json(customer); // se tudo tiver nos parametro cria se um produto
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body; // corpo da requisicao por json
    const { id } = req.params; // passado no parametro

    const updateCustomers = container.resolve(UpdateCustomerService);

    const customer = await updateCustomers.update({
      id, // onde id e passa no parametro
      name, // sao passado no corpo da requisicao sendo json
      email,
    });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // base_url/products/:o ID que vc quer deletar

    const deleteCustomers = container.resolve(DeleteCustomerService);

    await deleteCustomers.delete(id);
    return res.status(200).json({ message: 'Customer removed successfully' });
  }
}

export { CustomerContoller };
