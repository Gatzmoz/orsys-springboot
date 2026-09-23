export type User = {
	id: number;
	username: string;
	email: string;
};

export type AddressResponseDTO = {
	id: number;
	fullAddress: string;
	village: string;
	district: string;
	city: string;
	province: string;
	country: string;
	createdAt?: string;
	updatedAt?: string;
};

export type position = {
	id: number;
	name: string;
	division: {
		id: number;
		name: string;
		department: {
			id: number;
			name: string;
		};
	};
};

export type ManagerSummaryDTO = {
	id: number;
	name: string;
};

export type EmployeeResponseDTO = {
	id: number;
	employeeCode: string;
	name: string;
	isActive: boolean;
	phoneNumber: string;
	birthDate: string;
	baseSalary: number;
	employeeType: string;
	employeeStatus: "ACTIVE" | "INACTIVE" | "TERMINATED" | "LEAVE";
	gender: "MALE" | "FEMALE" | "OTHER";
	address?: AddressResponseDTO | null;
	manager?: ManagerSummaryDTO | null;
	position?: position | null;
	createdAt?: string;
	updatedAt?: string;
};

export type Employee = EmployeeResponseDTO;

export type ProfileFieldProps = {
	icon?: React.ReactNode;
	label: string;
	value: string;
};
