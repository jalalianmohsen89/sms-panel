const { execSync } = require("child_process");
module.exports = function (plop) {
  plop.setActionType("runCommand", function (answers, config, plop) {
    try {
      const result = execSync(config.command, { stdio: "inherit" });
      return result.toString();
    } catch (error) {
      throw error;
    }
  });

  plop.addHelper("globalActions", () => [
    {
      type: "runCommand",
      command: "npm run lint:fix" // دستور مرتب‌سازی گلوبال
    }
  ]);

  //----------------- module generator ---------------------
  plop.setGenerator("module", {
    description: "Create a new module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "module name:"
      },
      {
        type: "input",
        name: "pageName",
        message: "page name:"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/app/modules/{{kebabCase name}}/{{kebabCase pageName}}/index.tsx",
        templateFile: "plop-templates/module/page/index.tsx.hbs"
      },
      // {
      //   type: "add",
      //   path: "src/core/feature/{{kebabCase name}}/components/index.tsx",
      //   templateFile: "plop-templates/component/index.tsx.hbs"
      // },
      {
        type: "add",
        path: "src/core/feature/{{kebabCase name}}/hooks/{{pageName}}.ts",
        templateFile: "plop-templates/module/feature/hook/index.ts.hbs"
      },
      {
        type: "add",
        path: "src/core/feature/{{kebabCase name}}/types/index.ts",
        templateFile: "plop-templates/module/feature/types/index.ts.hbs"
      },
      {
        type: "add",
        path: "src/core/feature/{{kebabCase name}}/{{pascalCase name}}Routes.tsx",
        templateFile: "plop-templates/module/feature/routes.tsx.hbs"
      },
      {
        type: "add",
        path: "src/core/feature/{{kebabCase name}}/content/index.tsx",
        templateFile: "plop-templates/module/feature/content/index.tsx.hbs"
      },
      {
        type: "modify",
        path: "src/app/routing/PrivateRoutes.tsx",
        pattern: /(export\s+function\s+PrivateRoutes\s*\(\s*\)\s*{)/g,
        template: `$1\n const {{pascalCase name}}Routes = lazy(() => import("@/core/feature/{{kebabCase name}}/{{pascalCase name}}Routes.tsx"));`
      },
      {
        type: "modify",
        path: "src/app/routing/PrivateRoutes.tsx",
        pattern: /(\{\s*\/\*\s*Pages\s*\*\/\s*\})/g,
        template: `$1\n
         <Route
          path="{{kebabCase name}}/*"
          element={
            <SuspensedView>
              <{{pascalCase name}}Routes />
            </SuspensedView>
          }
        />`
      },
      ...plop.getHelper("globalActions")()
    ]
  });

  //----------------- page generator ---------------------
  plop.setGenerator("page", {
    description: "Create a new page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "module name:"
      },
      {
        type: "input",
        name: "pageName",
        message: "page name:"
      },
      {
        type: "input",
        name: "path",
        message: "path:"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/app/modules/{{path}}/{{kebabCase pageName}}/index.tsx",
        templateFile: "plop-templates/module/page/index.tsx.hbs"
      },
      {
        type: "append",
        path: "src/core/feature/{{kebabCase name}}/content/index.tsx",
        pattern: /import { IModuleRoutes } from "@\/core\/types";/,
        template: `import {{pascalCase pageName}} from "@/app/modules/{{path}}/{{kebabCase pageName}}"\n`
      },
      {
        type: "append",
        path: "src/core/feature/{{kebabCase name}}/content/index.tsx",
        pattern: /\/\/\s*pages\s*/g,
        template:
          `  {\n` +
          `    path: "{{kebabCase pageName}}",\n` +
          `    component: <{{pascalCase pageName}} />,\n` +
          `    permission: "UI::{{pascalCase name}}::{{pascalCase pageName}}" \n` +
          `  },\n`
      },
      ...plop.getHelper("globalActions")()
    ]
  });

  //----------------- component generator ---------------------
  plop.setGenerator("component", {
    description: "Create a new React component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:"
      },
      {
        type: "input",
        name: "folderPath",
        message: "Where should the component be created? (e.g., src/components)"
      }
    ],
    actions: [
      {
        type: "add",
        // path: "src/{{folderPath}}/SK{{pascalCase name}}.tsx",
        path: "src/core/components/composite/{{folderPath}}.tsx",
        templateFile: "plop-templates/component/index.tsx.hbs"
      },
      {
        type: "append",
        path: "src/core/components/composite/index.ts",
        template: 'export { {{pascalCase name}} } from "./{{folderPath}}";\n'
      }
    ]
  });

  //----------------- hook generator ---------------------
  plop.setGenerator("hook", {
    description: "Create a new React hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "hook name:"
      },
      {
        type: "input",
        name: "folderPath",
        message: "Where should the hook be created? (e.g., src/hook)"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/core/feature/{{folderPath}}/{{pascalCase name}}.ts",
        templateFile: "plop-templates/hook.ts.hbs"
      },
      ...plop.getHelper("globalActions")()
    ]
  });

  //----------------- type generator ---------------------
  plop.setGenerator("type", {
    description: "Create a new React type",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "type name:"
      },
      {
        type: "input",
        name: "folderPath",
        message: "Where should the type be created? (e.g., src/type)"
      }
    ],
    actions: [
      {
        type: "append",
        path: "src/core/feature/{{folderPath}}/types/index.ts",
        template:
          "export interface I{{pascalCase name}} {\n  // TODO: Add logic here\n}\n"
      },
      ...plop.getHelper("globalActions")()
    ]
  });

  //----------------- content generator ---------------------
  plop.setGenerator("content", {
    description: "Create a new content",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "folder name:"
      },
      {
        type: "input",
        name: "actionName",
        message: "action name:"
      },
      {
        type: "input",
        name: "folderPath",
        message: "Where should the content be created? (e.g., src/content)"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/core/feature/{{folderPath}}/index.tsx",
        templateFile: "plop-templates/template.ts.hbs"
      },
      ...plop.getHelper("globalActions")()
    ]
  });

  //----------------- method generator ---------------------
  plop.setGenerator("method", {
    description: "Add a new method to an existing file",
    prompts: [
      {
        type: "input",
        name: "methodName",
        message: "What is the name of the method?"
      },
      {
        type: "input",
        name: "filePath",
        message: "Which file do you want to modify? (e.g., src/utils.js)"
      }
    ],
    actions: [
      {
        type: "append",
        path: "{{filePath}}",
        template:
          "export const {{camelCase methodName}} = () => {\n  // TODO: Add logic here\n};\n"
      },
      ...plop.getHelper("globalActions")()
    ]
  });

  //----------------- method to component generator ---------------------
  plop.setGenerator("method to component", {
    description: "Add a new method to a React component",
    prompts: [
      {
        type: "input",
        name: "methodName",
        message: "What is the name of the method?"
      },
      {
        type: "input",
        name: "filePath",
        message:
          "Which component file do you want to modify? (e.g., src/components/App.tsx)"
      }
    ],
    actions: [
      {
        type: "modify",
        path: "{{filePath}}",
        pattern: /(const\s+App\s*:\s*React\.FC\s*=\s*\(\)\s*=>\s*{)/g,
        template: `$1\n  const {{camelCase methodName}} = () => {\n    // TODO: Implement your logic here\n  };\n`
      },
      ...plop.getHelper("globalActions")()
    ]
  });
};
