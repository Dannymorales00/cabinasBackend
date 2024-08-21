import { NextFunction, Request, Response } from "express";

function checkRole(..._roles: string[]) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const tokenData: any = _req.headers['tokenData'];
    if ((tokenData == null || tokenData == undefined)) {
      return res.status(401).send( 'tokenData not found');
    }
    // console.log(tokenData)
    // const json = JSON.stringify(tokenData);
    if (tokenData && _roles.includes( tokenData.tipo)) {
      return next();
    } else {
      return res.status(401).send('No tienes permiso para acceder a este recurso.');
    }
  }
}

export default checkRole;