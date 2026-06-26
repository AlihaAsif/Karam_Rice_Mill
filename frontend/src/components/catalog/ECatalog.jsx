import "./ECatalog.css";

export default function ECatalog() {
  return (
    <div className="catalog-full">
      <iframe
        src="/catalog.pdf"
        title="Karam Rice Mills E-Catalog"
        className="catalog-full-iframe"
      />
    </div>
  );
}
