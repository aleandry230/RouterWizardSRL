import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Avatar,
} from "@nextui-org/react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddProduct from "./AddProduct";
import axios from "axios";
import { API_URL } from "../../API/API";
import AddDiscount from "./AddDiscount";
import { Link } from "react-router-dom";
import EditProduct from "../../Pages/Products/EditProduct";
import DeleteProduct from "../../Pages/Products/DeleteProduct";

const columns = [
  { name: "Immagine", uid: "pic" },
  { name: "Prodotto", uid: "name" },
  { name: "Prezzo (€)", uid: "price" },
  { name: "Sconto (%)", uid: "discount" },
  { name: "Azioni", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["pic", "name", "price", "discount", "actions"];

export default function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    axios.get(API_URL + "Products/GetAll").then((res) => {
      setProducts(res.data);
    });
  }, []);

  function searchProduct(e) {
    if (e === "") {
      return axios.get(API_URL + "Products/GetAll").then((res) => {
        setProducts(res.data);
      });
    } else {
      axios
        .get(API_URL + "Products/GetProductSearch", { params: { title: e } })
        .then((res) => {
          setProducts(res.data);
        });
    }
  }
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products.slice(start, end);
  }, [page, rowsPerPage]);

  const pages = Math.ceil(products.length / rowsPerPage);

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "pic":
        return (
          <div className="py-2 px-2 flex justify-left items-center">
            <Avatar
              sizes="lg"
              radius="sm"
              isBordered
              src={API_URL + "uploads/" + product.path}
              name={cellValue}
            />
          </div>
        );
      case "name":
        return (
          <p className="py-2 px-2 flex justify-left items-center">
            {product.title}
          </p>
        );
      case "price":
        return (
          <p className="py-2 px-2 flex justify-left items-center">
            € {product.price}
          </p>
        );

      case "discount":
        return (
          <p className="py-2 px-2 flex justify-left items-center">
            {product.percentuale > 0 ? product.percentuale : 0}%
          </p>
        );

      case "actions":
        return (
          <div className="flex gap-5 justify-left items-center">
            <EditProduct data={product} />
            <DeleteProduct data={product} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="justify-between sm:flex gap-3 items-end">
          <Input
            className="w-full sm:max-w-[30%]"
            placeholder="Cerca prodotto per nome"
            onChange={(e) => searchProduct(e.target.value)}
          />
          <div className="flex gap-3 justify-center py-5 sm:justify-end">
            <AddProduct />
            <AddDiscount />
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    products.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className=" text-4xl font-bold text-center sm:text-start">
        {" "}
        Prodotti
      </h2>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames="w-full h-full"
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Nessun prodotto trovato"} items={products}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
