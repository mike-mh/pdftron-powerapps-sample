import { IInputs, IOutputs } from "./generated/ManifestTypes";
import WebViewer from '@pdftron/webviewer';
export class TSPDFTronComponent
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _notifyOutputChanged: () => void;
  // This element contains all elements of our code component example
  private _container: HTMLDivElement;
  // reference to Power Apps component framework Context object
  private _context: ComponentFramework.Context<IInputs>;
  // Event Handler 'refreshData' reference
  private _refreshData: EventListenerOrEventListenerObject;

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    this._context = context;
    this._container = document.createElement("div");
    this._notifyOutputChanged = notifyOutputChanged;
    this._refreshData = this.refreshData.bind(this);
    // Need to manually insert script tag for WebViewer CDN
	const webViewreScript = document.createElement('script');
    webViewreScript.src= 'REPLACE_WITH_CDN_URL';
    document.body.appendChild(webViewreScript);

	// Add WebViewer div to the DOM
	const viewerNode = document.createElement('div');
	viewerNode.style.width = '710px';
	viewerNode.style.height = '500px';
	viewerNode.id = 'viewer';

	this._container.appendChild(viewerNode);
	container.appendChild(this._container);
	
	(WebViewer as any)({
		path: 'REPLACE_WITH_CDN_PATH_TO_LIB',
 		config: 'REPLACE_WITH_TO_CDN_TO_YOUR_CONFIG_FILE',
	}, viewerNode)
  }

  public refreshData(evt: Event): void {
    this._notifyOutputChanged();
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
  }

  public destroy() {
  }
}