module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL|| process.env.DB_URL,

    entities: [
        process.env.NODE_ENV === 'test'
            ? 'src/**/*.entity.ts'
            : 'dist/**/*.entity.js',
    ],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
    extra: {
        ssl:
            process.env.SSL_MODE === 'require'
                ? {
                      rejectUnauthorized: false,
                  }
                : false,
    },
};
