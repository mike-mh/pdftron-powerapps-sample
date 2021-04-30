# pdftron-powerapps-sample
A simple PowerApps component using the PDFTron WebViewer 

## Requirements

```
node = 12.x (Recommended)
Power Apps CLI
.NET Framework 4.6.2 (Developer pack)
Visual Studio 2017 or higher
A server to host the PDFTron WebViewer.
```

To manually install the latest version of `Node 12.x`:

https://nodejs.org/dist/latest-v12.x/

If you'd like to easily switch between versions of Node, check out [nvm](https://github.com/nvm-sh/nvm).

## Installation

To get started, you will need to install the [Power Apps CLI](https://docs.microsoft.com/en-us/powerapps/developer/data-platform/powerapps-cli#:~:text=Microsoft%20Power%20Apps%20CLI%20is%20a%20simple%2C%20single-stop,developers%20and%20app%20makers%20to%20create%20code%20components.]) on your machine.

You can find detailed instructions for setting up the Power Apps CLI fomr [Microsoft's technical documentation](https://docs.microsoft.com/en-us/powerapps/developer/data-platform/powerapps-cli#install-power-apps-cli)

You'll also need to host the WebViewer in your own server with a full URL to be accessed from the PowerApps sample.

You can download the WebViewer from [this link](https://www.pdftron.com/downloads/WebViewer.zip) and place it on your server. You'll also want to follow the instructions [here](https://www.pdftron.com/documentation/web/guides/config-files/) to setup configure your WebViewr to be accesible by your Power Apps component.

You'll also need to include a `config.js` file. This sample below will load a PDF document into the viewer.

```
window.addEventListener('viewerLoaded', () => {
  readerControl.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf');
});
```

After this is done, you'll need to go into the `PDFTronComponent` directory and install all JavaScript dependencies

```
cd PDFTronComponent
npm i
```

You can run the component using the following command, but a few more steps are required for it to work.

```
npm run start
```

Doing this will show a running component but an error message will be displayed showing `Cannot GET /REPLACE_WITH_CDN_PATH_TO_LIB/ui/index.html`.

To resolve this, you need to change the `webViewreScript.src` value in the `PDFTronComponent\TSPDFTronComponent\index.ts` file with the full URL to your hosted WebViewer instance, the `path` value in the `WebViewer` constructor to the path of your hosted WebViewer libraries' `lib` folder and `config` to the URL of your hosted `config.js` file.

You can also load local instances of the WebViewer if you move the library into the `PDFTronComponent\out\controls\TSPDFTromComponent` directory.

When your ready to build your component to be uploaded to your Power Apps tenant navigate to the `Solutions` folder run the following command.

Be sure to replace the values for `--publisher-name` and `--publisher-prefix` to match your Power Apps environment.

```
cd Solutions
pac solution init --publisher-name developer --publisher-prefix dev
```

Next, you need to add a reference to where the component was created.

Run the following command updating the PATH variable to where the PDFTronComponent Folder is located. You can use `..` if you're running this from within the `Solutions` folder.

```
pac solution add-reference --path ..
```

After this is done, you should see a generated `Solutions.cdsproj` file.

Update the `PropertyGroup` to include an `OutputPath` valiue

```
  <PropertyGroup>
    <ProjectGuid>8afd4a66-28a7-4a13-830f-a1c85e2f18bc</ProjectGuid>
    <TargetFrameworkVersion>v4.6.2</TargetFrameworkVersion>
    <!--Remove TargetFramework when this is available in 16.1-->
    <TargetFramework>net462</TargetFramework>
    <RestoreProjectStyle>PackageReference</RestoreProjectStyle>
    <SolutionRootPath>src</SolutionRootPath>
    <OutputPath>$(MSBuildThisFileDirectory)release\bin</OutputPath>
  </PropertyGroup>
```

Remove comments around the `PropertyGroup` containing the `SolutionPackageType` tag.

```
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>
```

Next you'll need to restore and build the project.

```
msbuild /t:restore
msbuild /p:PcfBuildMode=production
```

You should now have the solution zipped in `PDFTronComponent\Solutions\release\bin\Solutions.zip`

You'll now be able to updload the solution to your Power Apps instace by following the instructions [here](https://docs.microsoft.com/en-us/powerapps/maker/data-platform/import-update-export-solutions).

You'll now be able to import custom components cotaining the PDFTron WebViewer.
