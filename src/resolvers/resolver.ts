import bcrypt from 'bcrypt' ;
import jwt from 'jsonwebtoken';

export default {
    Query: {
        getUser: async (parent, { id }, { prisma  }) => {
            const user = await prisma.user({ id });
            return user;
        },
        signIn: async (parent, { email, password }, { prisma }) => {
            try {
                const user = await prisma.user({ email });

                if (!user) {
                    throw new Error('Invalid credentials');
                }

                const passwordMatch = bcrypt.compareSync(password, user.password);

                if (!passwordMatch) {
                    throw new Error('Invalid credentials');
                }

                const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: 36000 });

                return { token };
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        signUp: async (parent, { email, password }, { prisma }) => {
            try {
                const hashedPassword = bcrypt.hashSync(password, 12);
                const user = await prisma.createUser({ email, password: hashedPassword });

                const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: 36000 });

                return { token };
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}