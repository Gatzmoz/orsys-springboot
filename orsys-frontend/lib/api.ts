import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const baseUrl = "http://localhost:8080/api";

export function useDashboardData() {
	const {
		data: departments,
		error: deptError,
		isLoading: deptLoading,
	} = useSWR(`${baseUrl}/organization/department`, fetcher);
	const {
		data: divisions,
		error: divError,
		isLoading: divLoading,
	} = useSWR(`${baseUrl}/organization/division`, fetcher);
	const {
		data: employees,
		error: empError,
		isLoading: empLoading,
	} = useSWR(`${baseUrl}/employee`, fetcher);

	return {
		departments,
		divisions,
		employees,
		isLoading: deptLoading || divLoading || empLoading,
		isError: deptError || divError || empError,
	};
}

// Alias for backwards compatibility if needed
export const APIRequest = useDashboardData;
