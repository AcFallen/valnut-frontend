import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username: string;
      userType: string;
      tenantId: string | null;
      profile: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        avatarUrl: string | null;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        createdBy: string | null;
        updatedBy: string | null;
      };
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    userType: string;
    tenantId: string | null;
    profile: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      avatarUrl: string | null;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      createdBy: string | null;
      updatedBy: string | null;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
    userType?: string;
    tenantId?: string | null;
    profile?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      avatarUrl: string | null;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      createdBy: string | null;
      updatedBy: string | null;
    };
  }
}