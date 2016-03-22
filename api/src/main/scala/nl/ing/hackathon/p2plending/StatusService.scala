package nl.ing.hackathon.p2plending

import java.lang.management.ManagementFactory
import akka.http.scaladsl.server.Directives._
import scala.concurrent.duration._

trait StatusService extends BaseService {
  val bcApi = new BlockchainApi("http://104.154.21.38:8545"/*, system, materializer*/)
  protected val serviceName = "my service"
  protected val routes = pathPrefix("status") {
    get {
      log.info("/status executed")
      complete(Status(Duration(ManagementFactory.getRuntimeMXBean.getUptime, MILLISECONDS).toString()))
    }
  } ~
    pathPrefix("bc") {
      path("borrower" / Segment) { name =>
        get {
          log.info("/bc/borrower executed")
          complete(bcApi.getBorrower(name))
        }
      }
    }
}
