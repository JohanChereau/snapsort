import './SortingToolPage.scss';
import FileSelector from 'components/fileSelector/FileSelector';

const SortingToolPage = () => {
  return (
    <main>
        <section className="sorting-tool-section">
            <div className="file-selectors-container container">
                <FileSelector title='Upload your photos' subtitle='Select your photo folder to sort.' instructions='or drag & drop your folder here.' actionButtonText='Browse folder'/>
                <FileSelector title='Export your photos' subtitle='Select a folder for exporting your sorted photos.' instructions='or drag & drop your folder here.' actionButtonText='Browse folder'/>
            </div>

            <button className="button bg-primary sorting-tool__sort-button">Sort</button>

        </section>
    </main>
  )
}

export default SortingToolPage