import {
    Box, TextField,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeArray} from "../../helpers/makeArray";
import {getProductsThunk} from "../../store/actions/productAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import {getCategoryThunk} from "../../store/actions/categoryAction";
import AddIcon from "@mui/icons-material/Add";
import "../aboutUs/aboutUs.scss";
import ProductDelteModal from "./productDelteModal";
import ProductAddModal from "./productAddModal";
import ProductEditModal from "./productEditModal";
const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.products);
    const count = useSelector((state) => state.productReducer.count);
    const categories = useSelector((state) => state?.categoryReducer.category);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const limit = 5;
    const [currentId, setCurrentId] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [row,setRow] = useState(null)
    const [search, setSearch] = useState()
        useEffect(() => {
        dispatch(getProductsThunk(page, limit, search));
    }, [page, limit, search]);

    useEffect(() => {
        dispatch(getCategoryThunk());
    }, []);

    useEffect(() => {
        if (count) {
            setPages(makeArray(Math.ceil(count / limit)));
        }
    }, [count, limit]);

    useEffect(() => {
        setTimeout(()=>{
            window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
        },100)
    }, [page]);
    useEffect(() => {
        setData(products);
    }, [products]);

    const transport = (row) => {
        setRow(row)
        setCurrentId(row.id);
        setOpenEdit(true);
    };
    return (<Box m={3} className="boxHeigth">
        <h2 mt={3} mb={3}>
            Products
        </h2>
        <hr/>
        <Box style={{margin: "10px"}}>
            <h4>Search</h4>
            <TextField placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
        </Box>
        <hr/>
        <Box m={2}>
            <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>
                <AddIcon/>
            </Button>
        </Box>
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Name Hy</TableCell>
                            <TableCell align="left">Name Ru</TableCell>
                            <TableCell align="left">Name En</TableCell>
                            <TableCell align="left">Description Hy</TableCell>
                            <TableCell align="left">Description Ru</TableCell>
                            <TableCell align="left">Description En</TableCell>
                            <TableCell align="left">Created/Updated</TableCell>
                            <TableCell align="left">Edit</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row, index) => (<TableRow
                            key={row.id}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                        >
                            <TableCell align="left">
                                <img
                                    src={row.ProductImages[0]?.image}
                                    alt="image"
                                    width={150}
                                    height={80}
                                />
                            </TableCell>
                            <TableCell align="left">{row.nameHy}</TableCell>
                            <TableCell align="left">{row.nameRu}</TableCell>
                            <TableCell align="left">{row.nameEn}</TableCell>
                            <TableCell align="left">{row.descriptionHy}</TableCell>
                            <TableCell align="left">{row.descriptionRu}</TableCell>
                            <TableCell align="left">{row.descriptionEn}</TableCell>
                            <TableCell align="left">
                                {row.createdAt.substr(0, 10)}
                            </TableCell>
                            <TableCell align="left">
                                <Button color="secondary" variant="outlined" onClick={() => transport(row)} autoFocus>
                                    <EditIcon/>
                                </Button>
                            </TableCell>
                            <TableCell align="left">
                                <Button color="secondary" variant="outlined" onClick={() => {
                                    setOpenDelete(true);
                                    setCurrentId(row.id);
                                }} autoFocus>
                                    <DeleteIcon className="iconsPreferances"/>
                                </Button>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

        <Box>
            {search && search.length ? null : (
                <div className="pagBox">
                    <div className="arrowBack">
                        {pages.length - 1 == page ? (<ArrowBackIcon
                            onClick={() => {
                                setPage(page - 1);
                            }}
                        />) : null}
                    </div>
                    {pages.length > 1 && pages.map((s) => {
                        return (<div
                            className={page === s ? "ActivePagItem" : "pagItem"}
                            key={s}
                            onClick={() => {
                                setPage(s);
                            }}
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            {s + 1}
                        </div>);
                    })}
                    <div className="arrowBack">
                        {pages.length - 1 == page ? null : (<ArrowForwardIcon
                            onClick={() => {
                                setPage(page + 1);
                            }}
                        />)}
                    </div>
                </div>
            )}
            <ProductEditModal openEdit={openEdit} setOpenEdit={setOpenEdit} row={row} currentId={currentId} />
            <ProductDelteModal open={openDel} setOpen={setOpenDelete} id={currentId}/>
            <ProductAddModal openAdd={openAdd} setOpenAdd={setOpenAdd} categories={categories}/>
        </Box>
    </Box>);
};

export default Products;
