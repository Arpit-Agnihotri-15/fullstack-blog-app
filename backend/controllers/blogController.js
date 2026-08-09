// Temporary blog storage
const blogs = [];

// Create Blog
const createBlog = (req, res) => {
    try {
        const {
            title,
            category,
            image,
            description,
            content,
            tags,
            author
        } = req.body;

        // Validate required fields
        if (
            !title ||
            !category ||
            !description ||
            !content ||
            !author
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, category, description, content and author are required"
            });
        }

        // Process tags
        let processedTags = [];

        if (Array.isArray(tags)) {
            processedTags = tags
                .map(tag => String(tag).trim())
                .filter(tag => tag !== "");
        } else if (typeof tags === "string") {
            processedTags = tags
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== "");
        }

        // Create blog
        const newBlog = {
            id: blogs.length + 1,
            title: title.trim(),
            category: category.trim(),
            image:
                image && image.trim()
                    ? image.trim()
                    : "https://placehold.co/900x400?text=Scriptora",
            description: description.trim(),
            content: content.trim(),
            tags: processedTags,
            author: author.trim(),
            createdAt: new Date().toISOString(),
            status: "Published"
        };

        blogs.push(newBlog);

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createBlog
};