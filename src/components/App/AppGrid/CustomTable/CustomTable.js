import React, { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Menu, MenuItem, Typography, Box, alpha
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ReactComponent as More } from '../../../../assets/images/more.svg';
import { ReactComponent as ArrowUp } from '../../../../assets/images/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../../../assets/images/arrow-down.svg';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import theme from "src/config/theme";
import Paging from "../../Paging";
const CustomTable = ({ columns, data, actions, headerButton, noDataComponent, page, perPage, totalCount, onPageChange, disabled = false, }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };
    const isRowActive = (row) => selectedRow === row;

    const handleSort = (columnId) => {
        setSortConfig(prev => {
            if (prev.key === columnId) {
                return {
                    key: columnId,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc'
                };
            }
            return { key: columnId, direction: 'asc' };
        });
    };
    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);
    return (
        <>
            <TableContainer component={Paper} sx={{
                borderRadius: "12px 12px 0 0",
                overflow: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
            }}>
                <Table >

                    <TableHead >
                        <TableRow

                            sx={{
                                backgroundColor: theme.palette.primary.light5,
                                borderBottom: `1px solid ${theme.palette.primary.light1}`,
                                borderRadius: '10px 10px 0 0',
                                height: '64px',
                            }}>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    onClick={() => handleSort(column.id)}
                                    sx={{
                                        ...theme.typography.h5,
                                        textAlign: 'center',
                                        padding: '20px',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        height: '64px',
                                        ...(column.sx)
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {column.label}

                                        {/* Always show both icons, highlight the active one */}
                                        <Box display="flex" flexDirection="column" ml={0.5}>
                                            <ArrowUp
                                                width={10}
                                                height={10}
                                                style={{
                                                    opacity: sortConfig.key === column.id && sortConfig.direction === 'asc' ? 1 : 0.3
                                                }}
                                            />
                                            <ArrowDown
                                                width={10}
                                                height={10}
                                                style={{
                                                    opacity: sortConfig.key === column.id && sortConfig.direction === 'desc' ? 1 : 0.3
                                                }}
                                            />
                                        </Box>

                                        {index === 0 && headerButton}
                                    </Box>
                                </TableCell>
                            ))}
                            {actions && <TableCell sx={{ ...theme.typography.h5, textAlign: 'center', padding: '20px', height: '64px' }}>Actions</TableCell>}
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{
                        ...(data.length === 0 && {

                        })
                    }}>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)}
                                    sx={{ borderBottom: 'none', position: 'absolute', left: '43%', top: '30%' }}>

                                    {noDataComponent || "No data available"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((row, rowIndex) => (

                                <TableRow key={rowIndex}
                                    sx={{
                                        backgroundColor: theme.palette.grey.white,
                                        borderBottom: `1px solid ${theme.palette.primary.light1}`,
                                        borderRadius: '10px 10px 0 0',
                                        height: '70px',
                                        ...(columns.sx || {})
                                    }}
                                >
                                    {columns.map((column) => (
                                        <TableCell key={column.id} sx={{
                                            ...theme.typography.smallRegular, textAlign: 'center', height: '64px', textAlign: 'center', padding: '15px 20px', ...(column.sx)
                                        }}>{row[column.id]}</TableCell>
                                    ))}


                                    {actions && (
                                        <TableCell sx={{ ...theme.typography.smallRegular, textAlign: 'center', height: '64px', textAlign: 'center', padding: '15px 20px' }}>

                                            <IconButton
                                                onClick={(event) => handleMenuOpen(event, row)}

                                                disabled={row.disableActions || disabled}

                                                sx={{
                                                    color: isRowActive(row) ? theme.palette.gery.white : theme.palette.primary.main,
                                                    // background: isRowActive(row) ? theme.palette.primary.main : theme.palette.primary.light4,
                                                    backgroundColor: disabled
                                                        ? theme.palette.gery.darkGray
                                                        : isRowActive(row)
                                                            ? theme.palette.primary.main
                                                            : theme.palette.primary.light4,
                                                }}>
                                                <More />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                                sx={{
                                                    "& .MuiPaper-root": {
                                                        width: "176px",
                                                        // height: "212px",
                                                        borderRadius: "12px",
                                                        // boxShadow: theme.shadows[1],
                                                        padding: "4px 18px",
                                                        backgroundColor: "red",
                                                        border: `1px solid ${alpha(theme.palette.gery.black, 0.1)}`,
                                                        backgroundColor: theme.palette.gery.white,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        gap: '14px',

                                                    }
                                                }}
                                            >
                                                {(typeof actions === "function" ? actions(selectedRow) : actions).map((action, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        onClick={() => {
                                                            action.onClick(selectedRow);
                                                            handleMenuClose();
                                                        }}

                                                    >
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            {action.icon} <Typography>{action.label}</Typography>
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Menu>





                                        </TableCell>
                                    )}
                                </TableRow>
                            ))

                        )}

                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '64px',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexShrink: 0,
                    borderRadius: '0px 0px 6px 6px',
                    paddingBottom: '16px',
                    // gap: '16px'
                }}>
                <Box sx={{ height: '8px', alignSelf: 'stretch', backgroundColor: theme.palette.primary.light5, }}>
                </Box>
                <Paging
                    size="small"
                    perPage={perPage}
                    page={page}
                    count={totalCount}
                    onChange={onPageChange}
                />
            </Box>
        </>
    );
};

export default CustomTable;
