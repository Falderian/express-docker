const createUsersTable = async (executeQuery: Function) => {
  try {
    const result = await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255),
        password VARCHAR(100)
      );
    `);

    console.log('Users table created (if not exists)');
  } catch (error) {
    console.error('Error creating Users table:', error);
  }
};

const createPostsTable = async (executeQuery: Function) => {
  try {
    const result = await executeQuery(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        -- add other fields as needed
      );
    `);

    console.log('Posts table created (if not exists)');
  } catch (error) {
    console.error('Error creating Posts table:', error);
  }
};

const createCommentsTable = async (executeQuery: Function) => {
  try {
    const result = await executeQuery(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255),
        user_id INTEGER REFERENCES users(id),
        post_id INTEGER REFERENCES posts(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Comments table created (if not exists)');
  } catch (error) {
    console.error('Error creating Comments table:', error);
  }
};

export { createUsersTable, createPostsTable, createCommentsTable }
