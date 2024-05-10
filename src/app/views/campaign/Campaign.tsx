import { useQuery } from "@tanstack/react-query";
import DataTable from "app/components/table/table/table";
import Spinner from "app/components/spinner/spinner";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { PageContentContainer } from "app/components/styles";
import { ContentBody } from "../sellerList/styles";
import { useState } from "react";
import { ITableHeadCell, Order } from "core/models/table";
import { fetchCampaigns } from "core/querryes/campaign/campaignQuerry";
import DefaultMenu, { IMenuItemProps } from "app/components/menu/DefaultMenu";
import CampaignDetailsModal from "app/components/modals/campaign/campaignDetails/CampaignDetailsModal";
import CampaignExecuteModal from "app/components/modals/campaign/campaignExecute/CampaignExecuteModal";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import { useNavigate } from "react-router-dom";
import theme from "core/theme/theme";
import { TRole, verifyRole } from "core/utils/roles";
import { useAppSelector } from "core/hooks/reduxHooks";

const Campaign = () => {
	const navigate = useNavigate();
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState("name");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [details, setDetails] = useState(false);
	const [executeCampaign, setExecuteCampaign] = useState(false);
	const open = Boolean(anchorEl);
	const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
	const acceptRoles: TRole[] = ["ROLE_ADMIN"]; 
	const notAcceptGroup: string  = "CLIENT";

	

	const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const items: IMenuItemProps[] = [
		{
			function: () => {
				setExecuteCampaign(true);
				handleCloseMenu();
			},
			label: "Executar campanha",
		},
		{
			function: () => {
				setDetails(true);
				handleCloseMenu();
			},
			label: "Detalhes da campanha",
		},
	];

	const head: ITableHeadCell[] = [
		{ name: "id", label: "ID", align: "left" },
		{ name: "name", label: "Nome", align: "left" },
		{ name: "createdAt", label: "Data criação", align: "center" },
		{ name: "action", label: "Opções", align: "right" },
	];

	const campaigns = useQuery({
		queryKey: ["campaigns"],
		queryFn: () => fetchCampaigns(page, rowsPerPage, orderBy, order),
		staleTime: Infinity,
	});

	if (
		!verifyRole(basicUserInfo?.roles, acceptRoles) ||
		basicUserInfo?.group === notAcceptGroup
	  ) {
		navigate(-1);
		return null; 
	  }
	
	return (
		<PageContentContainer>
			<TableHeader
				mainActionLabel="Nova campanha"
				mainActionFunction={() => navigate("/cadastroCampanha")}
				mainActionDisabled={Boolean(
					campaigns.data?.content && campaigns.data?.content.length >= 2
				)}
				mainIcon={
					<AddIcon
						sx={{
							fontSize: "20px",
							color: theme.COLORS.BLUE3,
						}}
					/>
				}
			/>
			<ContentBody>
				{campaigns.isLoading ? (
					<Box sx={{ position: "relative", height: 500 }}>
						<Spinner
							state={campaigns.isLoading}
							size={10}
							css={{
								position: "absolute",
								top: "50%",
								left: "50%",
							}}
						/>
					</Box>
				) : (
					<DataTable
						head={head}
						data={campaigns.data?.content}
						order={order}
						orderBy={orderBy}
						setOrder={setOrder}
						setOrderBy={setOrderBy}
						menu={
							<Tooltip title="Opções">
								<IconButton onClick={handleClickMenu}>
									<MoreHorizRounded />
								</IconButton>
							</Tooltip>
						}
					/>
				)}
			</ContentBody>
			<DefaultMenu
				anchor={anchorEl}
				menuItems={items}
				onClose={handleCloseMenu}
				status={open}
			/>
			{campaigns.data?.content[0] && (
				<CampaignExecuteModal
					id={campaigns.data?.content[0].id}
					isOpen={executeCampaign}
					onClose={() => setExecuteCampaign(false)}
					onOpen={() => setExecuteCampaign(true)}
					refresh={campaigns.refetch}
				/>
			)}
			{campaigns.data?.content[0] && (
				<CampaignDetailsModal
					campaign={campaigns.data?.content[0]}
					isOpen={details}
					onClose={() => setDetails(false)}
					onOpen={() => setDetails(true)}
				/>
			)}
		</PageContentContainer>
	);
};

export default Campaign;
