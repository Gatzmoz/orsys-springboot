import { ProfileFieldProps } from "@/lib/datatypes";

export default function ProfileField(Props: ProfileFieldProps) {
	return (
		<div className="profile-field">
			<div className="wrapper flex gap-5 items-center">
				{Props.icon}
				<div className="flex flex-col gap-0">
					<span className="text-gray-500 text-sm">{Props.label}</span>
					<span className="text-gray-900 font-medium">{Props.value}</span>
				</div>
			</div>
		</div>
	);
}
