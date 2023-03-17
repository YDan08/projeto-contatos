const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
	async index(req, res) {
		const { orderBy } = req.query;
		const categories = await CategoryRepository.findAll(orderBy);
		res.json(categories);
	}

	async store(req, res) {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ error: 'Nome é obrigatório' });
		}

		const category = await CategoryRepository.create({ name });

		res.json(category);
	}

	async show(req, res) {
		const { id } = req.params;
		const category = await CategoryRepository.findById(id);

		if (!category) {
			// 404: not found
			return res.status(404);
		}
		res.json(category);
	}

	async update(req, res) {
		const { id } = req.params;
		const { name } = req.body;

		const categoryExists = await CategoryRepository.findById(id);

		if (!categoryExists) {
			// 404: not found
			return res.status(404).json({ error: 'Categoria não encontrada' });
		}

		if (!name) {
			return res.status(400).json({ error: 'Nome é obrigatório' });
		}

		const category = await CategoryRepository.update(id, { name });
		res.json(category);
	}

	async delete(req, res) {
		const { id } = req.params;
		await CategoryRepository.delete(id);
		res.sendStatus(204);
	}
}

module.exports = new CategoryController();
