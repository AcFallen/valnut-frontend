import {
  LucideIcon,
  Home,
  Users,
  Settings,
  BarChart3,
  Package,
  Building2,
} from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  description?: string;
  children?: MenuItem[];
  external?: boolean;
  allowedUserTypes?: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview and main dashboard",
    allowedUserTypes: ["system_admin", "tenant_owner", "tenant_user"],
  },
  {
    id: "tenants",
    label: "Consultorios",
    href: "/tenants",
    icon: Building2,
    description: "Gestión de Consultorios",
    allowedUserTypes: ["system_admin"],
  },

  {
    id: "patients",
    label: "Pacientes",
    href: "/patients",
    icon: Users,
    description: "Gestión de pacientes",
    allowedUserTypes: ["tenant_owner", "tenant_user"],
  },
  {
    id: "settings",
    label: "Configuración",
    href: "/settings",
    icon: Settings,
    description: "Configuración del sistema",
    allowedUserTypes: ["tenant_owner"],
  },
  // {
  //   id: "patients",
  //   label: "Pacientes",
  //   icon: Users,
  //   description: "Gestión de pacientes",
  //   children: [
  //     {
  //       id: "patients-list",
  //       label: "Lista de Pacientes",
  //       href: "/dashboard/patients",
  //       description: "Ver todos los pacientes",
  //     },
  //     {
  //       id: "patients-add",
  //       label: "Nuevo Paciente",
  //       href: "/dashboard/patients/new",
  //       description: "Agregar nuevo paciente",
  //     },
  //     {
  //       id: "patients-appointments",
  //       label: "Citas",
  //       href: "/dashboard/patients/appointments",
  //       description: "Gestionar citas médicas",
  //     },
  //   ],
  // },

  // {
  //   id: "nutrition",
  //   label: "Nutrición",
  //   icon: Package,
  //   description: "Planes y seguimiento nutricional",
  //   children: [
  //     {
  //       id: "nutrition-plans",
  //       label: "Planes Nutricionales",
  //       href: "/dashboard/nutrition/plans",
  //       description: "Crear y gestionar planes"
  //     },
  //     {
  //       id: "nutrition-recipes",
  //       label: "Recetas",
  //       href: "/dashboard/nutrition/recipes",
  //       description: "Base de datos de recetas"
  //     },
  //     {
  //       id: "nutrition-supplements",
  //       label: "Suplementos",
  //       href: "/dashboard/nutrition/supplements",
  //       description: "Gestionar suplementos"
  //     }
  //   ]
  // },
  // {
  //   id: "reports",
  //   label: "Reportes",
  //   icon: BarChart3,
  //   description: "Análisis y reportes",
  //   children: [
  //     {
  //       id: "reports-progress",
  //       label: "Progreso Pacientes",
  //       href: "/dashboard/reports/progress",
  //       description: "Seguimiento del progreso",
  //     },
  //     {
  //       id: "reports-analytics",
  //       label: "Análisis",
  //       href: "/dashboard/reports/analytics",
  //       description: "Métricas y estadísticas",
  //     },
  //   ],
  // },
];
