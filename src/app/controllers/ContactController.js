const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
	async index(req, res) {
		// Listar todos os registros
		const { orderBy } = req.query;
		const contacts = await ContactRepository.findAll(orderBy);
		res.json(contacts);
	}

	async show(req, res) {
		// Obter um registro
		const { id } = req.params;
		const contact = await ContactRepository.findById(id);

		if (!contact) {
			// 404: not found
			return res.status(404).json({ error: 'Contato não encontrado' });
		}
		res.json(contact);
	}

	async store(req, res) {
		// Criar novo registro
		const { name, email, phone, category_id } = req.body;

		if (!name) {
			return res.status(400).json({ error: 'Nome é obrigatório' });
		}

		const contactExists = await ContactRepository.findByEmail(email);

		if (contactExists) {
			return res.status(400).json({ error: 'Email já cadastrado' });
		}

		const contact = await ContactRepository.create({
			name,
			email,
			phone,
			category_id,
		});

		res.json(contact);
	}

	async update(req, res) {
		// Editar um registro
		const { id } = req.params;
		const { name, email, phone, category_id } = req.body;

		const contactExists = await ContactRepository.findById(id);

		if (!contactExists) {
			return res.status(404).json({ error: 'Contato não encontrado' });
		}

		if (!name) {
			return res.status(400).json({ error: 'Nome é obrigatório' });
		}

		const contactByEmail = await ContactRepository.findByEmail(email);

		if (contactByEmail && contactByEmail.id !== id) {
			return res.status(400).json({ error: 'Email já cadastrado' });
		}

		const contact = await ContactRepository.update(id, {
			name,
			email,
			phone,
			category_id,
		});

		res.json(contact);
	}

	async delete(req, res) {
		// Deletar um registro
		const { id } = req.params;

		await ContactRepository.delete(id);
		// 204: Removeu
		res.sendStatus(204);
	}
}

module.exports = new ContactController();
