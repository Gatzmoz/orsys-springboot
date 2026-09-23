import useSWR, { mutate } from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const baseUrl = "http://localhost:8080/api";

export function useDashboardData() {
	const {
		data: departments,
		error: deptError,
		isLoading: deptLoading,
		mutate: mutateDepts,
	} = useSWR(`${baseUrl}/organization/department`, fetcher);
	const {
		data: divisions,
		error: divError,
		isLoading: divLoading,
		mutate: mutateDivs,
	} = useSWR(`${baseUrl}/organization/division`, fetcher);
	const {
		data: employees,
		error: empError,
		isLoading: empLoading,
		mutate: mutateEmps,
	} = useSWR(`${baseUrl}/employee`, fetcher);

	return {
		departments,
		divisions,
		employees,
		isLoading: deptLoading || divLoading || empLoading,
		isError: deptError || divError || empError,
		mutateAll: () => {
			mutateDepts();
			mutateDivs();
			mutateEmps();
		},
	};
}

export function useEmployeeData(id?: string | number) {
	const {
		data: employee,
		error,
		isLoading,
		mutate: mutateEmp,
	} = useSWR(id ? `${baseUrl}/employee/${id}` : null, fetcher);

	return {
		employee,
		error,
		isError: error,
		isLoading,
		mutateEmp,
	};
}

export function usePositionsData() {
	const {
		data: positions,
		error: posError,
		isLoading: posLoading,
		mutate: mutatePositions,
	} = useSWR(`${baseUrl}/organization/position`, fetcher);

	return {
		positions,
		isLoading: posLoading,
		isError: posError,
		mutatePositions,
	};
}

export function useAddressData() {
	const {
		data: addresses,
		error: addressError,
		isLoading: addressLoading,
		mutate: mutateAddresses,
	} = useSWR(`${baseUrl}/address`, fetcher);

	return {
		addresses,
		isLoading: addressLoading,
		isError: addressError,
		mutateAddresses,
	};
}

export function useDepartmentsData() {
	const {
		data: departments,
		error: deptError,
		isLoading: deptLoading,
		mutate: mutateDepartments,
	} = useSWR(`${baseUrl}/organization/department`, fetcher);

	return {
		departments,
		isLoading: deptLoading,
		isError: deptError,
		mutateDepartments,
	};
}

export function useDivisionsData() {
	const {
		data: divisions,
		error: divError,
		isLoading: divLoading,
		mutate: mutateDivisions,
	} = useSWR(`${baseUrl}/organization/division`, fetcher);

	return {
		divisions,
		isLoading: divLoading,
		isError: divError,
		mutateDivisions,
	};
}

// Alias for backwards compatibility if needed
export const APIRequest = useDashboardData;
